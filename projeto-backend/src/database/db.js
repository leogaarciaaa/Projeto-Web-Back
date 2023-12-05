import mongoose from "mongoose";

import { app } from '../app.js';

const port = process.env.PORT || 3000;

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/db")
    console.log("Database connected");

    // Inicia o servidor Express na porta especificada
    app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
    });
  } catch (error) {
    console.log("Database connection failed: ", error);
  }
}

export { dbConnect };