import { Router } from "express";

const router = Router();

router.get('/', async (req, res) => {
  try {
    const result = "oi";
    console.log(result);

    return res.status(201).json({ data: result });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
});



export { router as installApiRoute}