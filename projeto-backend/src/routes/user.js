import { Router } from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { deleteUser, updateUser, updateUserAndAdmin } from "../controller/userController.js";

const router = Router();

// Rota para deletar um usuário
// Utiliza o middleware verifyToken para verificar a autenticação do usuário
// Utiliza o middleware verifyAdmin para verificar se o usuário é um administrador
// Utiliza a função deleteUser do controlador para realizar a exclusão
router.post("/delete", verifyToken, verifyAdmin, deleteUser);

// Rota para atualizar um usuário
// Utiliza o middleware verifyToken para verificar a autenticação do usuário
// Utiliza a função updateUser do controlador para realizar a atualização
router.put("/update/:id", verifyToken, updateUser);

// Rota para atualizar um usuário como administrador
// Utiliza o middleware verifyToken para verificar a autenticação do usuário
// Utiliza o middleware verifyAdmin para verificar se o usuário é um administrador
// Utiliza a função updateUserAndAdmin do controlador para realizar a atualização como administrador
router.put("/update-admin/:id", verifyToken, verifyAdmin, updateUserAndAdmin);

export { router as userRoute };
