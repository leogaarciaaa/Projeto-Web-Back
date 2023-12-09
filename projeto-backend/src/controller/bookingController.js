import { RoomOperations } from "../model/roomModel.js";
import { GuestOperations } from "../model/guestModel.js";
import { BookingOperations } from "../model/bookingModel.js";
import jwt from "jsonwebtoken";

export const listBookings = async (req, res) => {
  try{
    const bookings = await BookingOperations.findAll();

    return res.status(200).json({ data: bookings })
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
}

export const createBooking = async (req, res) => {
  const { type, startDate, endDate } = req.body;
  const token = req.headers.authorization;
  try {

    const roomAlreadyExists = await RoomOperations.find({ type });

    if(!roomAlreadyExists[0]) {
      throw new Error("Room does not exist");
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

    const guestAlreadyExists = await GuestOperations.find({ email: sub });

    if(guestAlreadyExists[0].dependent_guests_number > roomAlreadyExists[0].capacity_number) {
      throw new Error(`This room only supports ${roomAlreadyExists[0].capacity_number} guest(s). Please book another room.`);
    }

    let today = new Date();
    today.setDate(today.getDate() - 1);
    const startDateFormat = new Date(startDate);
    const endDateFormat = new Date(endDate);

    if (startDateFormat <= today) {
      throw new Error("Start date must not be before today");
    }
    if (endDateFormat <= startDateFormat) {
      throw new Error("End date must be after start date");
    }

    const calcDifference = endDateFormat - startDateFormat;
    const numberOfNights = Math.ceil(calcDifference / (1000 * 60 * 60 * 24));
    
    const price = roomAlreadyExists[0].price_per_night * numberOfNights;
    const room_id = roomAlreadyExists[0]._id;

    const booking = {
      price,
      number_of_guests: guestAlreadyExists[0].dependent_guests_number,
      start_date: startDate,
      end_date: endDate,
      number_of_nights: numberOfNights,
      guest_id: guestAlreadyExists[0]._id,
      room_id
    }

    const createdBooking = await BookingOperations.create(booking);
    return res.status(201).json({ message: "Booking sucessfully created", data: createdBooking })
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
}