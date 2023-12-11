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
    const feedbacksList = await Feedback.find();
    return feedbacksList;
  },

  findAllAndPage: async function(skip, limit) {
    const feedbacksList = await Feedback.find().skip(skip).limit(limit);
    return feedbacksList;
  },

  find: async function(feedback_id) {
    const feedbacksList = await Feedback.find(feedback_id);
    return feedbacksList;
  },

  findAndPage: async function(guest_id, skip, limit) {
    const feedbacksList = await Feedback.find(guest_id).skip(skip).limit(limit);
    return feedbacksList;
  },

  create: async function (feedback) {
    const feedbackCreated = await Feedback.create(feedback);
    return feedbackCreated;
  },

  findById: async function (id) {
    const feedbackFound = await Feedback.findById(id);
    return feedbackFound;
  },

  findByIdAndDelete: async function (id) {
    const feedbackFound = await Feedback.findByIdAndDelete(id);
    return feedbackFound;
  },

  findByIdAndUpdate: async function (id, data) {
    const feedbackUpdated = await Feedback.findByIdAndUpdate(id, data);
    return feedbackUpdated;
  }
}

export { FeedbackOperations };
