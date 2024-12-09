import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import error from "../error/index.js";
const { BadRequestError, UnauthenticatedError } = error;

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ user });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    throw new BadRequestError("Please provide the email and the password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Please provide the valid email");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("please provide the valid password");
  }
  if (user.role != "Admin") {
    throw new UnauthenticatedError("You are not a Admin");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};
export default { login, register };
