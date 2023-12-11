import { GuestOperations } from "../model/guestModel.js";
import { BookingOperations } from "../model/bookingModel.js";
import { FeedbackOperations } from "../model/feedbackModel.js";
import jwt from "jsonwebtoken";

export const listFeedbacks = async (req, res) => {
  const page = parseInt(req.params.page);
  const limit = parseInt(req.params.limit);

  try{
    const skip = (page - 1) * limit;
    if(limit !== 5 && limit !== 10 && limit !== 30) {
      throw new Error("Please, select a limit of 5, 10 or 30 results per page.");
    }

    const bookings = await FeedbackOperations.findAllAndPage(skip, limit);

    return res.status(200).json({ data: bookings });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
}

export const listFeedbacksByGuest = async (req, res) => {
  const { guest_id } = req.body;
  const page = parseInt(req.params.page);
  const limit = parseInt(req.params.limit);
  try {
    const skip = (page - 1) * limit;
    if (limit !== 5 && limit !== 10 && limit !== 30) {
      throw new Error(
        "Please, select a limit of 5, 10 or 30 results per page."
      );
    }

    const feedbacksByGuest = await FeedbackOperations.findByGuestAndPage(
      guest_id,
      skip,
      limit
    );

    return res.status(200).json({ data: feedbacksByGuest });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
};

export const createFeedback = async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;

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

    const guestAlreadyExists = await GuestOperations.find({ email: sub });
    
    const booking = await BookingOperations.findById(id);
    if(!booking) {
      throw new Error("Booking does not exist");
    }

    if(booking.guest_id.equals(guestAlreadyExists[0].id)) {
      let today = new Date();
      today.setDate(today.getDate() - 1);
      
      if(booking.end_date < today) {
        throw new Error("Please, wait until your check-out date to share your feedback");
      }

      if(rating < 1 || rating > 5) {
        throw new Error("Please, give a rate between 1 and 5");
      }

    } else {
      return res.status(401).json({ message: "Unable to create feedback" });
    }

  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
}