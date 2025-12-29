import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token)
      return res.status(403).json({
        message: "Please login",
      });

    const JWT_SECRET = (process.env.Jwt_sec || "dev-jwt-secret").toString().trim();
    const decode = jwt.verify(token, JWT_SECRET);

    req.user = await User.findById(decode._id);

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
  
      return res
        .status(401)
        .json({ message: "Invalid token. Please log in again." });
    }
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Your session has expired. Please log in again." });
    }
    res.status(500).json({
      message: "An unexpected error occurred during authentication.",
    });
  }
};
