import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    // Nome do usuário
    name: {
      type: String,
      required: [true, 'Name is required'], // Campo obrigatório
    },
    // Endereço de e-mail do usuário
    email: {
      type: String,
      required: [true, 'Email is required'], // Campo obrigatório
    },
    // Senha do usuário
    password: {
      type: String,
      required: [true, 'Password is required'], // Campo obrigatório
    },
    // Indica se o usuário possui privilégios de administrador
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

const User = mongoose.model('User', userSchema);

const UserOperations = {
  find: async function (email) {
    const userFound = await User.find(email);
    return userFound;
  },

  create: async function (user) {
    const userCreated = await User.create(user);
    return userCreated;
  },

  deleteOne: async function (user) {
    const userDeleted = await User.deleteOne(user);
    return userDeleted;
  },

  findById: async function (id) {
    const userFound = await User.findById(id);
    return userFound;
  },

  findByIdAndUpdate: async function (id, data) {
    const userUpdated = await User.findByIdAndUpdate(id, data);
    return userUpdated;
  }
}

export { UserOperations };
