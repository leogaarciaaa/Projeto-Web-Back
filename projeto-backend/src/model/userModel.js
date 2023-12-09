import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    admin: {
      type: Boolean,
      required: [true, 'Admin status is required'],
    },
  },
  {
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
