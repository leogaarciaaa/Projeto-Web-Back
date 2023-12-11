import { Router } from "express";
import { verifyGuest } from "../middlewares/verifyGuest.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { listFeedbacks, listFeedbacksByGuest, createFeedback } from "../controller/feedbackController.js";

const router = Router();

router.get('/feedback/list-all/:page/:limit', listFeedbacks);
router.get('/feedback/list/:page/:limit', verifyToken, verifyGuest, listFeedbacksByGuest);
router.post('/feedback/create/:id', verifyToken, verifyGuest, createFeedback);
export { router as feedbackRoute };