import Docter from "../models/Docter.js";
import { StatusCodes } from "http-status-codes";
import error from "../error/index.js";
const { BadRequestError, UnauthenticatedError } = error;

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    throw new BadRequestError("Please provide the email and the password");
  }
  const user = await Docter.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Please provide the valid email");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("please provide the valid password");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};
export default { login };
