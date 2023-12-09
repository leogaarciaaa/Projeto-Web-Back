import { Router } from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createRoom } from "../controller/roomController.js";

const router = Router();

router.get('/list');
router.post('/create', verifyToken, verifyAdmin, createRoom);
router.put('/update/:id');
router.post('/delete');

export { router as roomRoute};