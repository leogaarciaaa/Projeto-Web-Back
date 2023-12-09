import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema(
  {
    price: {
      type: Number,
      required: [true, 'Type is required'],
    },
    number_of_guests: {
      type: Number,
      required: [true, 'Number of guests required'],
    },
    start_date: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    end_date: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    number_of_nights: {
      type: Number,
      required: [true, 'Number of nights required'],
    },
    guest_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Guest',
      required: [true, 'Guest id is required'],
    },
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: [true, 'Room id is required'],
    }
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);

const BookingOperations = {
  findAll: async function() {
    const bookingsList = await Booking.find();
    return bookingsList;
  },

  create: async function (booking) {
    const bookingCreated = await Booking.create(booking);
    return bookingCreated;
  },

  deleteOne: async function (booking) {
    const bookingDeleted = await Booking.deleteOne(booking);
    return bookingDeleted;
  },

  findById: async function (id) {
    const bookingFound = await Booking.findById(id);
    return bookingFound;
  },

  findByIdAndUpdate: async function (id, data) {
    const roomUpdated = await Room.findByIdAndUpdate(id, data);
    return roomUpdated;
  }
}

export { BookingOperations };
