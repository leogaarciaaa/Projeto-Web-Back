import jwt from "jsonwebtoken";
import { UserOperations } from "../model/userModel.js";
import { GuestOperations } from "../model/guestModel.js";

export const blockNonAdminNonGuest = async (req, res, next) => {
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

    if (user[0].admin || guest[0].email === sub) {
      next();
    } else {
      return res.status(401).json({ message: "Access not allowed to non admin user" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};