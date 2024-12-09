import error from "../error/index.js";
const { UnauthenticatedError } = error;
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Token not found");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };

    if (payload.role) {
      req.user.role = payload.role;
    }
    next();
  } catch (error) {
    throw new UnauthenticatedError("Token is invalid");
  }
};
export default authenticationMiddleware;
