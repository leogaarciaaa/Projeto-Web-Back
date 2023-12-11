import 'dotenv/config';
import express from "express";
import cookieParser from "cookie-parser";
import { AuthRoute } from "./routes/auth.js";
import { installApiRoute } from './routes/installApi.js';
import { userRoute } from './routes/user.js';
import { guestRoute } from './routes/guest.js';
import { roomRoute } from './routes/room.js';
import { bookingRoute } from './routes/booking.js';
import { feedbackRoute } from './routes/feedback.js';
import { swaggerDocRoute } from './routes/docs.js';
import { dbConnect } from "./database/db.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors());

app.use(AuthRoute);
app.use(installApiRoute);
app.use(userRoute);
app.use(guestRoute);
app.use(roomRoute);
app.use(bookingRoute);
app.use(feedbackRoute);
app.use(swaggerDocRoute);

await dbConnect();


export { app };
