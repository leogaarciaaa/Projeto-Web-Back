import mongoose from 'mongoose';

const feedbackSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, 'Type is required'],
    },
    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: [true, 'Booking id is required'],
    },
    guest_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Guest',
      required: [true, 'Guest id is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);

const FeedbackOperations = {
  findAll: async function() {
    const bookingsList = await Booking.find();
    return bookingsList;
  },

  findByGuestAndPage: async function(guest_id, skip, limit) {
    const feedbacksList = await Feedback.find({guest_id}).skip(skip).limit(limit);
    return feedbacksList;
  },

  findAllAndPage: async function(skip, limit) {
    const feedbacksList = await Feedback.find().skip(skip).limit(limit);
    return feedbacksList;
  },

  find: async function(booking_id) {
    const bookingsList = await Feedback.find(booking_id);
    return bookingsList;
  },

  findAndPage: async function(guest_id, skip, limit) {
    const bookingsList = await Booking.find(guest_id).skip(skip).limit(limit);
    return bookingsList;
  },

  create: async function (feedback) {
    const feedbackCreated = await Feedback.create(feedback);
    return feedBackCreated;
  },

  findById: async function (id) {
    const bookingFound = await Booking.findById(id);
    return bookingFound;
  },

  findByIdAndDelete: async function (id) {
    const bookingFound = await Booking.findByIdAndDelete(id);
    return bookingFound;
  },

  findByIdAndUpdate: async function (id, data) {
    const bookingUpdated = await Booking.findByIdAndUpdate(id, data);
    return bookingUpdated;
  }
}

export { FeedbackOperations };
