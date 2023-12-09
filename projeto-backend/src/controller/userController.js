import bcryptjs from "bcryptjs";
import { UserOperations } from "../model/userModel.js";
import jwt from "jsonwebtoken";


export const deleteUser = async (req, res) => {
  const { email } = req.body;

  try {
    const userAlreadyExists = await UserOperations.find({ email });

    if (!userAlreadyExists[0]) {
      throw new Error("User does not exist");
    }

    const userDeleted = await UserOperations.deleteOne({
      email: userAlreadyExists[0].email,
    });

    if (userDeleted.deletedCount !== 0) {
      res.status(200).json({
        message: "User deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  const token = req.headers.authorization;
  const { email, name, password } = req.body;

  try {
    const user = await UserOperations.findById(id);

    const { sub } = jwt.decode(
      token,
      process.env.SECRET_KEY,
      (error, _) => {
        if (error) {
          return res.status(498).json({ message: "Invalid token" });
        }
      }
    );

    if (user.email === sub) {

      const passwordHash = await bcryptjs.hash(password, 8);

      const userUpdated = await UserOperations.findByIdAndUpdate(id, {
        email,
        name,
        password: passwordHash,
      });

      return res.status(200).json({ data: userUpdated });
    } else {
      return res.status(400).json({ message: "Unable to update user" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};


export const updateUserAndAdmin = async (req, res) => {

  const { id } = req.params;

  const { email, name, password } = req.body;

  try {
    const passwordHash = await bcryptjs.hash(password, 8);

    const userUpdated = await UserOperations.findByIdAndUpdate(id, {
      name,
      email,
      password: passwordHash,
    });

    return res.status(200).json({ data: userUpdated });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};
