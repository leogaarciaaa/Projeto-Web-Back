import mongoose from 'mongoose';

const roomSchema = mongoose.Schema(
  {
    // Tipo de acomodação
    type: {
      type: String,
      required: [true, 'Type is required'], // Campo obrigatório
    },
    // Capacidade máxima do quarto
    capaticy_number: {
      type: Number,
      required: [true, 'Max guest number is required'], // Campo obrigatório
    },
    // Preço da diária da acomodação
    price_per_night: {
      type: Number,
      required: [true, 'Price is required'], // Campo obrigatório
    },
    // ID do admin criador da acomodação
    user_admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User id is required'], // Campo obrigatório
    }
  },
  {
    // Adiciona automaticamente os campos `createdAt` e `updatedAt` para rastreamento de tempo
    timestamps: true,
  }
);

const Room = mongoose.model('Room', roomSchema);

const RoomOperations = {
  find: async function (email) {
    const roomFound = await Room.find(email);
    return roomFound;
  },

  create: async function (guest) {
    const roomCreated = await Room.create(guest);
    return roomCreated;
  },

  deleteOne: async function (guest) {
    const roomDeleted = await Room.deleteOne(guest);
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
