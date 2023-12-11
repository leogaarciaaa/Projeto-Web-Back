import { Router } from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyGuest } from "../middlewares/verifyGuest.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { listFeedbacks, listFeedbacksByGuest, createFeedback } from "../controller/feedbackController.js";

const router = Router();

router.get('/list-all/:page/:limit', listFeedbacks);
router.get('/list/:page/:limit', verifyToken, verifyGuest, listFeedbacksByGuest);
router.post('/create/:id', verifyToken, verifyGuest, createFeedback);

export { router as feedbackRoute };