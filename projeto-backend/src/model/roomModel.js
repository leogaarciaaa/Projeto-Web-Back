import mongoose from 'mongoose';

const roomSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, 'Type is required'],
    },
    capacity_number: {
      type: Number,
      required: [true, 'Capacity number is required'],
    },
    price_per_night: {
      type: Number,
      required: [true, 'Price is required'],
    },
    user_admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User id is required'],
    }
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model('Room', roomSchema);

const RoomOperations = {
  findAll: async function() {
    const roomsList = await Room.find();
    return roomsList;
  },

  find: async function (type) {
    const roomFound = await Room.find(type);
    return roomFound;
  },

  create: async function (room) {
    const roomCreated = await Room.create(room);
    return roomCreated;
  },

  deleteOne: async function (room) {
    const roomDeleted = await Room.deleteOne(room);
    return roomDeleted;
  },

  findById: async function (id) {
    const roomFound = await Room.findById(id);
    return roomFound;
  },

  findByIdAndUpdate: async function (id, data) {
    const roomUpdated = await Room.findByIdAndUpdate(id, data);
    return roomUpdated;
  }
}

export { RoomOperations };
