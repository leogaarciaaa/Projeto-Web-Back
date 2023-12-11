import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { GuestOperations } from "../model/guestModel.js";

export const listGuests = async (req, res) => {
  //#swagger.tags = ['Guest']
  const page = parseInt(req.params.page);
  const limit = parseInt(req.params.limit);

  try{
    const skip = (page - 1) * limit;
    if(limit !== 5 && limit !== 10 && limit !== 30) {
      throw new Error("Please, select a limit of 5, 10 or 30 results per page.");
    }
    const guests = await GuestOperations.findAllAndPage(skip, limit);

    return res.status(200).json({ data: guests })
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
}

export const deleteGuest = async (req, res) => {
  //#swagger.tags = ['Guest']
  const { email } = req.body;

  try {
    const guestAlreadyExists = await GuestOperations.find({ email });

    if (!guestAlreadyExists[0]) {
      throw new Error("Guest does not exist");
    }

    const guestDeleted = await GuestOperations.deleteOne({
      email: guestAlreadyExists[0].email,
    });

    if (guestDeleted.deletedCount !== 0) {
      res.status(200).json({
        message: "Guest deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};

export const updateGuest = async (req, res) => {
  //#swagger.tags = ['Guest']
  const { id } = req.params;

  const token = req.headers.authorization;
  const { email, name, cpf, birthDate, dependentGuestsNumber, password } = req.body;

  try {
    const guest = await GuestOperations.findById(id);

    const { sub } = jwt.decode(
      token,
      process.env.SECRET_KEY,
      (error, _) => {
        if (error) {
          return res.status(498).json({ message: "Invalid token" });
        }
      }
    );

    if (guest.email === sub) {

      const passwordHash = await bcryptjs.hash(password, 8);

      const guestUpdated = await GuestOperations.findByIdAndUpdate(id, {
        email,
        name,
        cpf,
        birth_date: birthDate,
        dependent_guests_number: dependentGuestsNumber,
        password: passwordHash,
      });

      return res.status(200).json({ data: guestUpdated });
    } else {
      return res.status(401).json({ message: "Unable to update guest" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};