import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserOperations } from "../model/userModel.js";
import { GuestOperations } from "../model/guestModel.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userAlreadyExists = await UserOperations.find({ email });

    if (userAlreadyExists[0]) {
      throw new Error("User already exists");
    }

    const passwordHash = await bcryptjs.hash(password, 8);

    const user = {
      name,
      email,
      password: passwordHash,
      admin: false,
    };

    const createdUser = await UserOperations.create(user);

    return res.status(201).json({ data: createdUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userAlreadyExists = await UserOperations.find({ email });

    if (!userAlreadyExists[0]) {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcryptjs.compare(
      password,
      userAlreadyExists[0].password
    );

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({}, process.env.SECRET_KEY, {
      subject: userAlreadyExists[0].email,
      expiresIn: "600s",
    });

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};


export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userAlreadyExists = await UserOperations.find({ email });

    if (userAlreadyExists[0]) {
      throw new Error("User already exists");
    }

    const passwordHash = await bcryptjs.hash(password, 8);

    const user = {
      name,
      email,
      password: passwordHash,
      admin: true,
    };

    const createdUser = await UserOperations.create(user);

    return res.status(201).json({ data: createdUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};


export const registerGuest = async (req, res) => {
  const { name, email, cpf, birthDate, dependentGuestsNumber, password } = req.body;

  try {
    const guestAlreadyExists = await GuestOperations.find({ email });

    if (guestAlreadyExists[0]) {
      throw new Error("Guest already exists");
    }

    const passwordHash = await bcryptjs.hash(password, 8);

    const guest = {
      name,
      email,
      cpf,
      birth_date: birthDate,
      dependent_guests_number: dependentGuestsNumber,
      password: passwordHash,
      admin: false,
    };

    const createdGuest = await GuestOperations.create(guest);

    return res.status(201).json({ data: createdGuest });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
}

export const loginGuest = async (req, res) => {
  const { email, password } = req.body;

  try {
    const guestAlreadyExists = await GuestOperations.find({ email });

    if (!guestAlreadyExists[0]) {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcryptjs.compare(
      password,
      guestAlreadyExists[0].password
    );

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({}, process.env.SECRET_KEY, {
      subject: guestAlreadyExists[0].email,
      expiresIn: "600s",
    });

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};