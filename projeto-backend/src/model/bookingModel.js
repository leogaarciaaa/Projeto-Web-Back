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

export { BookingOperations };
