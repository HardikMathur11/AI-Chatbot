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
    res.status(500).json({
      message: "Login First",
    });
  }
};
