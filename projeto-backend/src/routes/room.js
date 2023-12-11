import { Router } from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { listRooms, createRoom, deleteRoom, updateRoom } from "../controller/roomController.js";

const router = Router();

router.get('/room/list-all/:page/:limit', listRooms);
router.post('/room/create', verifyToken, verifyAdmin, createRoom);
router.put('/room/update/:id', verifyToken, verifyAdmin, updateRoom);
router.delete('/room/delete', verifyToken, verifyAdmin, deleteRoom);

export { router as roomRoute };