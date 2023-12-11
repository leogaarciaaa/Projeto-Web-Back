import { RoomOperations } from "../model/roomModel.js";
import { GuestOperations } from "../model/guestModel.js";
import { BookingOperations } from "../model/bookingModel.js";
import jwt from "jsonwebtoken";

export const listBookings = async (req, res) => {
  //#swagger.tags = ['Booking']
  const page = parseInt(req.params.page);
  const limit = parseInt(req.params.limit);

  try{
    const skip = (page - 1) * limit;
    if(limit !== 5 && limit !== 10 && limit !== 30) {
      throw new Error("Please, select a limit of 5, 10 or 30 results per page.");
    }

    const bookings = await BookingOperations.findAllAndPage(skip, limit);

    return res.status(200).json({ data: bookings });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
}

export const listBookingsByGuest = async (req, res) => {
  //#swagger.tags = ['Booking']
  const token = req.headers.authorization;

  const page = parseInt(req.params.page);
  const limit = parseInt(req.params.limit);

  try{

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

    if(guest[0].email === sub) {
      const skip = (page - 1) * limit;
      if(limit !== 5 && limit !== 10 && limit !== 30) {
        throw new Error("Please, select a limit of 5, 10 or 30 results per page.");
      }

      const bookings = await BookingOperations.findAndPage({ guest_id: guest[0]._id } , skip, limit);

      return res.status(200).json({ data: bookings });
    } else {
      return res.status(401).json({ message: "Bookings are not available to your account"});
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
}

export const createBooking = async (req, res) => {
  //#swagger.tags = ['Booking']
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
    return res.status(201).json({ message: "Booking successfully created", data: createdBooking });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
}

export const deleteBooking = async (req, res) => {
  //#swagger.tags = ['Booking']
  const { id } = req.body;
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

    const booking = await BookingOperations.findById(id);
    const guest = await GuestOperations.find({email: sub});

    if(booking) {
      if(guest[0]) {
        if(!guest[0]._id.equals(booking.guest_id)) {
          throw new Error("Guest unable to delete this booking");
        }
      }
    }
  
    const bookingDeleted = await BookingOperations.findByIdAndDelete(id);
    if(!bookingDeleted) {
      throw new Error("Booking does not exist");
    }
    if(bookingDeleted.deletedCount !== 0) {
      return res.status(200).json({ message: "Booking deleted" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
}

export const updateBooking = async (req, res) => {
  //#swagger.tags = ['Booking']
  const { id } = req.params;
  const { type, startDate, endDate } = req.body;

  const token = req.headers.authorization;
  
  try{
    const booking = await BookingOperations.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
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
    
    if (booking.guest_id.equals(guestAlreadyExists[0]._id)) {
      const roomAlreadyExists = await RoomOperations.find({ type });

      if(!roomAlreadyExists[0]) {
        throw new Error("Room does not exist");
      }

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

      const bookingToUpdate = {
        price,
        number_of_guests: guestAlreadyExists[0].dependent_guests_number,
        start_date: startDate,
        end_date: endDate,
        number_of_nights: numberOfNights,
        guest_id: guestAlreadyExists[0]._id,
        room_id
      }

      const bookingUpdated = await BookingOperations.findByIdAndUpdate(id, bookingToUpdate);
      return res.status(200).json({ message: "Booking successfully updated", data: bookingUpdated });
    } else {
      return res.status(401).json({ message: "Unable to update booking" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
}