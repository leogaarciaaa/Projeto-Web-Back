import jwt from "jsonwebtoken";
import { GuestOperations } from "../model/guestModel.js";

export const verifyGuest = async (req, res, next) => {
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

    const guest = await GuestOperations.find({ email: sub });
    if (!guest[0]) {
      return res.status(401).json({ message: "Guest access needed" });
    }

    if (guest[0].email === sub) {
      next();
    } else {
      return res.status(401).json({ message: "Access not allowed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};