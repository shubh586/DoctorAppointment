import Stripe from "stripe";
import Payment from "../models/Payment.js";
import Appointment from "../models/Appointment.js";
import { StatusCodes } from "http-status-codes";
import error from "../error/index.js";
const { NotFoundError, BadRequestError } = error;

// Initialize Stripe with secret key from environment
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a payment intent for an appointment
const createPaymentIntent = async (req, res) => {
    const { appointmentId } = req.body;
    const userId = req.user.userId;

    // Find the appointment
    const appointment = await Appointment.findOne({
        _id: appointmentId,
        user: userId,
        paymentStatus: "pending",
    });

    if (!appointment) {
        throw new NotFoundError(
            "Appointment not found or payment already processed"
        );
    }

    // Check if appointment has expired
    if (appointment.expiresAt && new Date() > appointment.expiresAt) {
        appointment.paymentStatus = "expired";
        appointment.status = "Cancelled";
        await appointment.save();
        throw new BadRequestError("This appointment has expired. Please book again.");
    }

    try {
        // Create Stripe payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(appointment.fees * 100), // Convert to smallest currency unit (paise)
            currency: "inr",
            metadata: {
                appointmentId: appointment._id.toString(),
                userId: userId,
                doctorId: appointment.doctor.toString(),
            },
            description: `Appointment with ${appointment.doctorName} on ${new Date(
                appointment.slotTime
            ).toLocaleDateString()}`,
        });

        // Create payment record
        const payment = await Payment.create({
            appointment: appointment._id,
            user: userId,
            doctor: appointment.doctor,
            amount: appointment.fees,
            currency: "inr",
            paymentIntentId: paymentIntent.id,
            status: "pending",
        });

        // Link payment to appointment
        appointment.paymentId = payment._id;
        await appointment.save();

        res.status(StatusCodes.OK).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            expiresAt: appointment.expiresAt,
        });
    } catch (err) {
        console.error("Stripe error:", err);
        throw new BadRequestError("Failed to create payment intent");
    }
};

// Verify payment after completion
const verifyPayment = async (req, res) => {
    const { paymentIntentId } = req.body;
    const userId = req.user.userId;

    try {
        // Retrieve payment intent from Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        // Find payment record
        const payment = await Payment.findOne({ paymentIntentId });

        if (!payment) {
            throw new NotFoundError("Payment record not found");
        }

        // Verify user owns this payment
        if (payment.user.toString() !== userId) {
            throw new BadRequestError("Unauthorized");
        }

        // Update payment status
        payment.status = paymentIntent.status === "succeeded" ? "succeeded" : "failed";
        payment.paymentMethod = paymentIntent.payment_method_types[0];

        if (paymentIntent.status === "failed" || paymentIntent.status === "canceled") {
            payment.failureReason = paymentIntent.last_payment_error?.message || "Payment failed";
        }

        await payment.save();

        // Update appointment status
        const appointment = await Appointment.findById(payment.appointment);

        if (!appointment) {
            throw new NotFoundError("Appointment not found");
        }

        if (paymentIntent.status === "succeeded") {
            appointment.paymentStatus = "paid";
            appointment.status = "Confirmed";
            appointment.expiresAt = null; // Clear expiration
        } else {
            appointment.paymentStatus = "failed";
            // Keep status as Pending so user can retry payment
        }

        await appointment.save();

        res.status(StatusCodes.OK).json({
            success: true,
            payment,
            appointment,
            message:
                paymentIntent.status === "succeeded"
                    ? "Payment successful! Appointment confirmed."
                    : "Payment failed. Please try again.",
        });
    } catch (err) {
        console.error("Payment verification error:", err);
        throw new BadRequestError(err.message || "Failed to verify payment");
    }
};

// Get payment history for a user
const getPaymentHistory = async (req, res) => {
    const userId = req.user.userId;

    const payments = await Payment.find({ user: userId })
        .populate("appointment")
        .populate("doctor", "name speciality image")
        .sort({ createdAt: -1 });

    res.status(StatusCodes.OK).json({
        success: true,
        payments,
        count: payments.length,
    });
};

// Get specific payment details
const getPaymentById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    const payment = await Payment.findOne({ _id: id, user: userId })
        .populate("appointment")
        .populate("doctor", "name speciality image address");

    if (!payment) {
        throw new NotFoundError("Payment not found");
    }

    res.status(StatusCodes.OK).json({
        success: true,
        payment,
    });
};

// Webhook handler for Stripe events (for production use)
const handleWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error("Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case "payment_intent.succeeded":
            const paymentIntent = event.data.object;
            // Update payment and appointment status
            const payment = await Payment.findOne({
                paymentIntentId: paymentIntent.id,
            });

            if (payment) {
                payment.status = "succeeded";
                payment.paymentMethod = paymentIntent.payment_method_types[0];
                await payment.save();

                const appointment = await Appointment.findById(payment.appointment);
                if (appointment) {
                    appointment.paymentStatus = "paid";
                    appointment.status = "Confirmed";
                    appointment.expiresAt = null;
                    await appointment.save();
                }
            }
            break;

        case "payment_intent.payment_failed":
            const failedIntent = event.data.object;
            const failedPayment = await Payment.findOne({
                paymentIntentId: failedIntent.id,
            });

            if (failedPayment) {
                failedPayment.status = "failed";
                failedPayment.failureReason = failedIntent.last_payment_error?.message;
                await failedPayment.save();

                const appointment = await Appointment.findById(failedPayment.appointment);
                if (appointment) {
                    appointment.paymentStatus = "failed";
                    await appointment.save();
                }
            }
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
};

export default {
    createPaymentIntent,
    verifyPayment,
    getPaymentHistory,
    getPaymentById,
    handleWebhook,
};
