import mongoose from 'mongoose';

const guestSchema = mongoose.Schema(
  {
    // Nome do hóspede
    name: {
      type: String,
      required: [true, 'Name is required'], // Campo obrigatório
    },
    // Endereço de e-mail do hóspede
    email: {
      type: String,
      required: [true, 'Email is required'], // Campo obrigatório
    },
    // CPF do hóspede
    cpf: {
      type: String,
      required: [true, 'CPF is required'], // Campo obrigatório
    },
    // Data de nascimento do hóspede
    birth_date: {
      type: Date,
      required: [true, 'Birth date is required'], // Campo obrigatório
    },
    // Senha do hóspede
    password: {
      type: String,
      required: [true, 'Password is required'], // Campo obrigatório
    },
    admin: {
      type: Boolean,
      required: [true, 'Admin status is required'], // Campo obrigatório
    },
  },
  {
    // Adiciona automaticamente os campos `createdAt` e `updatedAt` para rastreamento de tempo
    timestamps: true,
  }
);

const Guest = mongoose.model('Guest', guestSchema);

const GuestOperations = {
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
