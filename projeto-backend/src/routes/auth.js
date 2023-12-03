import { Router } from "express";

import {
  login,
  register,
  registerAdmin,
} from "../controller/authController.js";

import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
/**
 * @module authController
 * @description
 *   Módulo que contém funções controladoras relacionadas à autenticação de usuários.
 *   Utiliza o framework Express e middlewares personalizados.
 */

const router = Router();

/**
 * Rota para registrar um novo usuário na aplicação.
 * @name POST /register
 * @function
 * @memberof module:authController
 * @inner
 * @param {Function} register - Função controladora para o registro de usuários.
 */
router.post("/register", register);

/**
 * Rota para autenticar um usuário na aplicação.
 * @name POST /login
 * @function
 * @memberof module:authController
 * @inner
 * @param {Function} login - Função controladora para a autenticação de usuários.
 */
router.post("/login", login);

/**
 * Rota para registrar um novo usuário como administrador na aplicação.
 * Requer autenticação do token e verificação de administrador.
 * @name POST /register-admin
 * @function
 * @memberof module:authController
 * @inner
 * @param {Function} verifyToken - Middleware para verificar a autenticação do token.
 * @param {Function} verifyAdmin - Middleware para verificar as permissões de administrador.
 * @param {Function} registerAdmin - Função controladora para o registro de usuários como administradores.
 */
router.post("/register-admin", verifyToken, verifyAdmin, registerAdmin);

export { router as AuthRoute };
