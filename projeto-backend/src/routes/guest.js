import { Router } from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { deleteGuest, updateGuest } from "../controller/guestController.js";

const router = Router();

router.post("/delete", verifyToken, verifyAdmin, deleteGuest);
router.put("/update/:id", verifyToken, updateGuest);

export { router as guestRoute };