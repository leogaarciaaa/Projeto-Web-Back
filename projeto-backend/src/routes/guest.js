import { Router } from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { listGuests, deleteGuest, updateGuest } from "../controller/guestController.js";

const router = Router();

router.get("/guest/list-all/:page/:limit", verifyToken, verifyAdmin, listGuests)
router.delete("/guest/delete", verifyToken, verifyAdmin, deleteGuest);
router.put("/guest/update/:id", verifyToken, updateGuest);

export { router as guestRoute };