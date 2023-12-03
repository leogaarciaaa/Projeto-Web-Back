import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";

/**
 * @function verifyAdmin
 * @async
 * @param {Object} req - Objeto de requisição Express.
 * @param {Object} res - Objeto de resposta Express.
 * @param {Function} next - Função de middleware Express para chamar o próximo middleware na cadeia.
 * @returns {Promise<void>} - Promessa que representa a conclusão da função.
 * @description
 *   Esta função middleware verifica se o usuário autenticado possui privilégios de administrador.
 *   Utiliza o token de autorização fornecido no cabeçalho da requisição para identificar o usuário.
 *   Retorna um erro se o token for inválido ou se o usuário não for um administrador.
 * @throws {Error} - Lança um erro se ocorrer um problema durante a verificação de administrador.
 */
export const verifyAdmin = async (req, res, next) => {
  // Extrai o token de autorização do cabeçalho da requisição
  const token = req.headers.authorization;

  try {
    // Decodifica o token para obter o subject (sub)
    const { sub } = jwt.decode(
      token,
      "3dc190e6-b357-4bc0-8175-7561790a4ada",
      (error, _) => {
        if (error) {
          // Se ocorrer um erro durante a decodificação, retorna uma resposta de erro com status 498
          return res.status(498).json({ message: "Invalid token" });
        }
      }
    );

    // Busca o usuário no banco de dados com base no endereço de e-mail obtido do token
    const user = await User.find({ email: sub });

    // Verifica se o usuário é um administrador
    if (user[0].admin) {
      // Chama o próximo middleware na cadeia
      next();
    } else {
      // Se o usuário não for um administrador, retorna uma resposta de erro com status 401
      return res.status(401).json({ message: "You need admin access" });
    }
  } catch (error) {
    // Se ocorrer algum erro durante o processamento, retorna uma resposta de erro com status 500
    return res.status(500).json({ message: "Internal server error" });
  }
};
