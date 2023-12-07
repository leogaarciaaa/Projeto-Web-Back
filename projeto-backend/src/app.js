import 'dotenv/config';
import express from "express";
import cookieParser from "cookie-parser";
import { AuthRoute } from "./routes/auth.js";
import { installApiRoute } from './routes/installApi.js';
import { userRoute } from './routes/user.js';
import { guestRoute } from './routes/guest.js';
import { dbConnect } from "./database/db.js";
import cors from "cors";
//import mongoose from "mongoose";

// Cria uma instância do aplicativo Express
const app = express();

// Adiciona middleware para analisar JSON no corpo das requisições
app.use(express.json());

// Adiciona middleware para analisar cookies nas requisições
app.use(cookieParser());

// Adiciona middleware para lidar com requisições CORS
app.use(cors());

// Define rotas para autenticação e manipulação de usuários
app.use("/auth", AuthRoute);
app.use("/install", installApiRoute);
app.use("/user", userRoute);
app.use("/guest", guestRoute);

await dbConnect();


export { app };
