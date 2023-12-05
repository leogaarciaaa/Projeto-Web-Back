import { Router } from "express";

import {
  login,
  register,
  registerAdmin,
} from "../controller/authController.js";

const router = Router();

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const result = await registerAdmin();
    console.log(result);

    return res.status(201).json({ data: result });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});



export { router as installApiRoute}