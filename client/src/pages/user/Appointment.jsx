import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContextProvider";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets_admin/assets";
import Relatedcomponent from "../../Components/Relatedcomponent";
import axios from "axios";
const Appointment = () => {
  const { doctors } = useContext(AppContext);
  const { docId } = useParams();
  const [getDoctor, setDoctor] = useState({});
  const [docSlots, setDocSlot] = useState([]);
  const [getSlotIndex, setSlotIndex] = useState(0);
  const [slotTimes, setSlotTimes] = useState("");
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [error, setError] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]); // Store already booked slots
  useEffect(() => {
    const foundDoctor = doctors.find((doctor) => doctor._id === docId);
    setDoctor(foundDoctor || {});
  }, [docId, doctors]);

  // Fetch booked slots for this doctor
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (getDoctor?._id) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/users/doctor/${getDoctor._id}/appointments`
          );
          // Extract booked slot times
          const booked = response.data.appointments.map(apt => apt.slotTime);
          setBookedSlots(booked);
        } catch (error) {
          console.error("Error fetching booked slots:", error);
        }
      }
    };
    fetchBookedSlots();
  }, [getDoctor]);

  useEffect(() => {
    if (getDoctor?._id && bookedSlots.length >= 0) {
      getAvailableSlots();
    }
  }, [getDoctor, bookedSlots]); // Re-run when booked slots change

  const getAvailableSlots = () => {
    console.log(`📅 Generating slots... Booked count: ${bookedSlots.length}`, bookedSlots);
    setDocSlot([]);
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentdate = new Date();
      currentdate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (endTime.getDate() === today.getDate()) {
        if (currentdate.getHours() > 10) {
          currentdate.setHours(currentdate.getHours() + 1);
        } else {
          currentdate.setHours(10);
        }

        if (currentdate.getMinutes() > 30) {
          currentdate.setMinutes(30);
        } else {
          currentdate.setMinutes(0);
        }
      } else {
        currentdate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];

      while (currentdate <= endTime) {
        let formatedTime = currentdate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // Check if this slot is already booked
        const isBooked = bookedSlots.some(bookedTime => {
          const bookedDate = new Date(bookedTime);
          const match = bookedDate.getTime() === currentdate.getTime();
          if (match) {
            console.log(`✅ MATCHED BOOKED SLOT: ${formatedTime}`, {
              bookedDate: bookedDate.toISOString(),
              currentdate: currentdate.toISOString(),
            });
          }
          return match;
        });

        if (isBooked) {
          console.log(`🔴 Slot ${formatedTime} is BOOKED`);
        }

        timeSlots.push({
          datetime: new Date(currentdate),
          Time: formatedTime,
          isBooked: isBooked, // Add booked status
        });
        currentdate.setMinutes(currentdate.getMinutes() + 30);
      }
      setDocSlot((prev) => [...prev, timeSlots]);
    }
  };

  const collectInfo = async (e) => {
    setError(null);
    e.preventDefault();
    if (!slotTimes || !getDoctor._id) {
      alert("Please select a slot before booking.");
      return;
    }

    const selectedSlot = docSlots[getSlotIndex].find(
      (slot) => slot.Time === slotTimes
    );
    if (!selectedSlot) {
      alert("Invalid slot selection. Please try again.");
      return;
    }
    try {
      console.log(selectedSlot.datetime.toISOString());
      const response = await axios.post(
        "http://localhost:5000/api/users/bookappointments",
        {
          docId: getDoctor._id,
          slotTime: selectedSlot.datetime.toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      alert("appointment has been booked");
      console.log(response.data);
    } catch (error) {
      setError(
        error.response?.data?.msg || "Booking failed. Please try again."
      );
      console.error("Error login user:", error);
    }
  };

  return (
    <div className="mx-auto p-4 container">
      {/* {Docters about us section } */}
      <div className="flex md:flex-row flex-col items-center md:items-start gap-10 px-4 py-5">
        <div>
          <img
            src={`http://localhost:5000${getDoctor.image}`}
            alt=""
            className="bg-primary rounded-lg sm:w-[300px]"
          />
        </div>
        <div className="flex flex-col flex-1 gap-4 border-gray-400 px-5 py-8 border border-b-2 rounded-lg">
          <p className="font-medium text-start sm:text-xl lg:text-3xl md:text:2xl">
            {getDoctor.name}{" "}
            <img
              src={assets.verified_icon}
              alt="Verified Icon"
              className="inline-block"
            />
          </p>
          <div className="flex flex-row items-center gap-3">
            <p className="text-base text-gray-600">
              {getDoctor.degree} - {getDoctor.speciality}
            </p>
            <p className="px-3 border border-b-1 border-blue-400 rounded-full">
              {getDoctor.experience} years
            </p>
          </div>
          <p className="flex items-center gap-1 text-base text-gray-900 dark:text-white">
            About
            <img
              src={assets.info_icon}
              alt="Info Icon"
              className="inline-block"
            />
          </p>
          <div>
            <p className="text-justify sm:text-md md:text-base">
              {getDoctor.about}
            </p>
          </div>
          <p className="text-gray-800 dark:text-gray-200 font-medium">
            Appointment fee:{" "}
            <span className="font-semibold text-primary dark:text-blue-400">₹ {getDoctor.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking slots */}
      <div className="mt-4 sm:ml-72 sm:pl-4 font-medium text-gray-700 dark:text-gray-300">
        <p className="text-lg mb-3">Booking slots</p>
        <div className="flex items-center gap-3 overflow-x-auto">
          {docSlots.length &&
            docSlots.map((item, index) => (
              <div
                key={index}
                className={`py-6 min-w-16 rounded-full cursor-pointer text-center ${getSlotIndex === index
                  ? "bg-primary text-white"
                  : "border border-gray-600"
                  }`}
                onClick={() => setSlotIndex(index)}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>
        <div className="flex items-center gap-3 mt-4 w-full overflow-x-auto">
          {docSlots.length &&
            docSlots[getSlotIndex].map((item, index) => (
              <div
                onClick={() => !item.isBooked && setSlotTimes(item.Time)}
                className={`flex-shrink-0 px-5 py-2 rounded-full font-light text-sm ${item.isBooked
                  ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed line-through"
                  : item.Time === slotTimes
                    ? "bg-primary text-white cursor-pointer"
                    : "border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 cursor-pointer hover:border-primary dark:hover:border-primary"
                  }`}
                key={index}
                title={item.isBooked ? "Already booked" : "Click to select"}
              >
                <p className="">{item.Time}{item.isBooked ? " (Booked)" : ""}</p>
              </div>
            ))}
        </div>
        <button
          onClick={(e) => {
            collectInfo(e);
          }}
          className="bg-primary my-6 px-14 py-3 rounded-full font-light text-sm text-white"
        >
          Book An Appoinment
        </button>
        {error && <p className="mt-3 text-red-500">{error}</p>}
      </div>
      <Relatedcomponent
        docId={docId}
        speciality={getDoctor?.speciality || ""}
      ></Relatedcomponent>
    </div>
  );
};

export default Appointment;
