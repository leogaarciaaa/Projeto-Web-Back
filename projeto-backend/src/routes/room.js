import { Router } from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { listRooms, createRoom, deleteRoom, updateRoom } from "../controller/roomController.js";

const router = Router();

router.get('/list-all', listRooms);
router.post('/create', verifyToken, verifyAdmin, createRoom);
router.put('/update/:id', verifyToken, verifyAdmin, updateRoom);
router.post('/delete', verifyToken, verifyAdmin, deleteRoom);

export { router as roomRoute};