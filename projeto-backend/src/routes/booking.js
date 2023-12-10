import { Router } from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyGuest } from "../middlewares/verifyGuest.js";
import { verifyGuestOrAdmin } from "../middlewares/verifyGuestOrAdmin.js";
import { listBookings, listBookingsByGuest, createBooking, deleteBooking, updateBooking } from "../controller/bookingController.js";

const router = Router();

router.get('/list-all', verifyToken, verifyAdmin, listBookings);
router.get('/list', verifyToken, verifyGuest, listBookingsByGuest);
router.post('/create', verifyToken, verifyGuest, createBooking);
router.put('/update/:id', verifyToken, verifyGuest, updateBooking);
router.post('/delete', verifyToken, verifyGuestOrAdmin, deleteBooking);

export { router as bookingRoute};