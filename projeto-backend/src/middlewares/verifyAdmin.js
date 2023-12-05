import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";

export const verifyAdmin = async (req, res, next) => {
  // Extrai o token de autorização do cabeçalho da requisição
  const token = req.headers.authorization;

  try {
    // Decodifica o token para obter o subject (sub)
    const { sub } = jwt.decode(
      token,
      process.env.SECRET_KEY,
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
