import express from "express";
import cookieParser from "cookie-parser";
import { AuthRoute } from "./routes/auth.js";
import cors from "cors";
import mongoose from "mongoose";

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

// Obtém a porta do ambiente ou utiliza a porta 3333 como padrão
const port = process.env.PORT || 3333;

// Conecta-se ao banco de dados MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/db")
  .then(() => {
    console.log("Database connected");

    // Inicia o servidor Express na porta especificada
    app.listen(port, () => {
      console.log(`Server running at:${port}`);
    });
  })
  .catch((error) => {
    console.log("Database connection failed:", error);
  });

export { app };
