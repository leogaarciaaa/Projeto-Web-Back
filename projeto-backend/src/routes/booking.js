import { Router } from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyGuest } from "../middlewares/verifyGuest.js";
import { listBookings, createBooking} from "../controller/bookingController.js";

const router = Router();

router.get('/list-all', verifyToken, verifyAdmin, listBookings);
router.post('/create', verifyToken, verifyGuest, createBooking);
// router.put('/update/:id', verifyToken, verifyAdmin, updateRoom);
// router.post('/delete', verifyToken, verifyAdmin, deleteRoom);

export { router as bookingRoute};