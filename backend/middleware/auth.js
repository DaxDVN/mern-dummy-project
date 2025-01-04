import {verifyToken} from "../util/jwtHelper.js";
import User from "../models/user.js";

export const authenticate = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({error: "Authorization token is missing"});
  }

  try {
    const tokenWithoutBearer = token.split(" ")[1];

    const decoded = verifyToken(tokenWithoutBearer);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({error: "User not found"});
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({error: "Invalid or expired token"});
  }
};
