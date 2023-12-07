import { Router } from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { deleteGuest, updateGuest } from "../controller/guestController.js";

const router = Router();

// Rota para deletar um hóspede
// Utiliza o middleware verifyToken para verificar a autenticação do hóspede/usuário
// Utiliza o middleware verifyAdmin para verificar se o usuário é um administrador
// Utiliza a função deleteUser do controlador para realizar a exclusão
router.post("/delete", verifyToken, verifyAdmin, deleteGuest);

// Rota para atualizar um hóspede
// Utiliza o middleware verifyToken para verificar a autenticação do hóspede
// Utiliza a função updateUser do controlador para realizar a atualização
router.put("/update/:id", verifyToken, updateGuest);

export { router as guestRoute };