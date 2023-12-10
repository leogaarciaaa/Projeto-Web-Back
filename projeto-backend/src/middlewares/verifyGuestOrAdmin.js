import jwt from "jsonwebtoken";
import { UserOperations } from "../model/userModel.js";
import { GuestOperations } from "../model/guestModel.js";

export const verifyGuestOrAdmin = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const { sub } = jwt.decode(
      token,
      process.env.SECRET_KEY,
      (error, _) => {
        if (error) {
          return res.status(498).json({ message: "Invalid token" });
        }
      }
    );

    const user = await UserOperations.find({ email: sub });
    const guest = await GuestOperations.find({ email: sub });

    if(!user[0] && guest[0]) {
      if(guest[0].email === sub) {
        next();
      } else {
        return res.status(401).json({ message: "Access denied" });
      }
    } else if(!guest[0] && user[0]) {
      if(user[0].admin) {
        next();
      } else {
        return res.status(401).json({ message: "You need admin access" });
      }
    } else {
      return res.status(401).json({ message: "Admin or guest not registered" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};