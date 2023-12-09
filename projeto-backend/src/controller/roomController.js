import { RoomOperations } from "../model/roomModel.js";
import { UserOperations } from "../model/userModel.js";
import jwt from "jsonwebtoken";

export const createRoom = async (req, res) => {
  const { type, capacityNumber, pricePerNight } = req.body;
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
    const userAlreadyExists = await UserOperations.find({ email: sub });

    const room = {
      type,
      capaticy_number: capacityNumber,
      price_per_night: pricePerNight,
      user_admin_id: userAlreadyExists[0]._id
    }

    const createdRoom = await RoomOperations.create(room);
    return res.status(201).json({ data: createdRoom });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
}