import { RoomOperations } from "../model/roomModel.js";
import { UserOperations } from "../model/userModel.js";
import jwt from "jsonwebtoken";

export const listRooms = async (req, res) => {
  //#swagger.tags = ['Room']
  const page = parseInt(req.params.page);
  const limit = parseInt(req.params.limit);

  try{
    const skip = (page - 1) * limit;
    if(limit !== 5 && limit !== 10 && limit !== 30) {
      throw new Error("Please, select a limit of 5, 10 or 30 results per page.");
    }
    const rooms = await RoomOperations.findAllAndPage(skip, limit);

    return res.status(200).json({ data: rooms })
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
}

export const createRoom = async (req, res) => {
  //#swagger.tags = ['Room']
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
  //#swagger.tags = ['Room']
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
      res.status(200).json({ message: "Room deleted" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
}

export const updateRoom = async (req, res) => {
  //#swagger.tags = ['Room']
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

    const roomToUpdate = {
      type,
      capacity_number: capacityNumber,
      price_per_night: pricePerNight,
      user_admin_id: userAlreadyExists[0]._id
    }

    const roomUpdated = await RoomOperations.findByIdAndUpdate(id, roomToUpdate);
    return res.status(200).json({ data: roomUpdated });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
}