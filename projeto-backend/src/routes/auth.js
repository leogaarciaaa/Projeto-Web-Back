import { Router } from "express";
import { login, loginGuest, register, registerAdmin, registerGuest } from "../controller/authController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/login-guest", loginGuest);
router.post("/auth/register-guest", registerGuest);
router.post("/auth/register-admin", verifyToken, verifyAdmin, registerAdmin);

export { router as AuthRoute };