import { Router } from "express";

import {
  login,
  register,
  registerAdmin,
} from "../controller/authController.js";

import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/register-admin", verifyToken, verifyAdmin, registerAdmin);

export { router as AuthRoute };