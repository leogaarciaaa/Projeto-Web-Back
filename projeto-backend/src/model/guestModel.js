import mongoose from 'mongoose';

const guestSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    cpf: {
      type: String,
      required: [true, 'CPF is required'],
    },
    birth_date: {
      type: Date,
      required: [true, 'Birth date is required'],
    },
    dependent_guests_number: {
      type: Number,
      required: [true, 'Dependent guests number is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Guest = mongoose.model('Guest', guestSchema);

const GuestOperations = {
  findAllAndPage: async function (skip, limit) {
    const guestsList = await Guest.find().skip(skip).limit(limit);;
    return guestsList;
  },

  find: async function (email) {
    const guestFound = await Guest.find(email);
    return guestFound;
  },

  create: async function (guest) {
    const guestCreated = await Guest.create(guest);
    return guestCreated;
  },

  deleteOne: async function (guest) {
    const guestDeleted = await Guest.deleteOne(guest);
    return guestDeleted;
  },

  findById: async function (id) {
    const guestFound = await Guest.findById(id);
    return guestFound;
  },

  findByIdAndUpdate: async function (id, data) {
    const guestUpdated = await Guest.findByIdAndUpdate(id, data);
    return guestUpdated;
  }
}

export { GuestOperations };
