import jwt from "jsonwebtoken"
import {SECRET_KEY} from '../config.js'

export const generateToken = (user) => {
  const payload = {
    userId: user._id,
    email: user.email
  };

  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: '1h'
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};