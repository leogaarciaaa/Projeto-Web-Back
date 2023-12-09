import 'dotenv/config';
import express from "express";
import cookieParser from "cookie-parser";
import { AuthRoute } from "./routes/auth.js";
import { installApiRoute } from './routes/installApi.js';
import { userRoute } from './routes/user.js';
import { guestRoute } from './routes/guest.js';
import { roomRoute } from './routes/room.js';
import { dbConnect } from "./database/db.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors());

app.use("/auth", AuthRoute);
app.use("/install", installApiRoute);
app.use("/user", userRoute);
app.use("/guest", guestRoute);
app.use("/room", roomRoute);

await dbConnect();


export { app };
