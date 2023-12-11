import { Router } from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { deleteUser, updateUser, updateUserAndAdmin } from "../controller/userController.js";

const router = Router();

router.delete("/user/delete", verifyToken, verifyAdmin, deleteUser);
router.put("/user/update/:id", verifyToken, updateUser);
router.put("/user/update-admin/:id", verifyToken, verifyAdmin, updateUserAndAdmin);

export { router as userRoute };
