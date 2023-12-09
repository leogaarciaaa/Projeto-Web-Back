import { RoomOperations } from "../model/roomModel.js";
import { UserOperations } from "../model/userModel.js";
import jwt from "jsonwebtoken";

export const listRooms = async (req, res) => {
  try{
    const rooms = await RoomOperations.findAll();

    return res.status(200).json({ data: rooms })
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
}

export const createRoom = async (req, res) => {
  const { type, capacityNumber, pricePerNight } = req.body;
  const token = req.headers.authorization;

  try {

    const roomAlreadyExists = await RoomOperations.find({ type });

    if (roomAlreadyExists[0]) {
      throw new Error("Room already exists");
    }

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
      capacity_number: capacityNumber,
      price_per_night: pricePerNight,
      user_admin_id: userAlreadyExists[0]._id
    }

    const createdRoom = await RoomOperations.create(room);
    return res.status(201).json({ data: createdRoom });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
}

export const deleteRoom = async (req, res) => {
  const { type } = req.body;

  try {
    const roomAlreadyExists = await RoomOperations.find({ type });

    if(!roomAlreadyExists[0]) {
      throw new Error("Room does not exist");
    }

    const roomDeleted = await RoomOperations.deleteOne({
      type: roomAlreadyExists[0].type
    });

    if (roomDeleted.deletedCount !== 0) {
      res.status(200).json({
        message: "Room deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
}

export const updateRoom = async (req, res) => {
  const { id } = req.params;

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

    const roomUpdated = {
      type,
      capacity_number: capacityNumber,
      price_per_night: pricePerNight,
      user_admin_id: userAlreadyExists[0]._id
    }

    const createdRoom = await RoomOperations.findByIdAndUpdate(id, roomUpdated);
    return res.status(200).json({ data: createdRoom });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
}