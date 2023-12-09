import { Router } from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { listGuests, deleteGuest, updateGuest } from "../controller/guestController.js";

const router = Router();

router.get("/list-all", verifyToken, verifyAdmin, listGuests)
router.post("/delete", verifyToken, verifyAdmin, deleteGuest);
router.put("/update/:id", verifyToken, updateGuest);

export { router as guestRoute };