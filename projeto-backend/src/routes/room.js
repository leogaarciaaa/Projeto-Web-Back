import { Router } from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyToken } from "../middlewares/verifyToken.js";
//import { deleteGuest, updateGuest } from "../controller/guestController.js";

const router = Router();

router.get('/list');

router.post('/create');

router.put('/update/:id');

router.post('/delete');

export { router as roomRoute};