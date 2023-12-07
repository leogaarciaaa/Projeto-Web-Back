import { Router } from "express";

import {
  login,
  loginGuest,
  register,
  registerAdmin,
  registerGuest,
} from "../controller/authController.js";

import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/login-guest", loginGuest);

router.post("/register-guest", registerGuest);

router.post("/register-admin", verifyToken, verifyAdmin, registerAdmin);

export { router as AuthRoute };