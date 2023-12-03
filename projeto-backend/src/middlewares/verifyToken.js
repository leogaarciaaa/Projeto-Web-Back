import jwt from "jsonwebtoken";

/**
 * @function verifyToken
 * @param {Object} req - Objeto de requisição Express.
 * @param {Object} res - Objeto de resposta Express.
 * @param {Function} next - Função de middleware Express para chamar o próximo middleware na cadeia.
 * @returns {void}
 * @description
 *   Middleware que verifica a presença e validade de um token de autenticação JWT no cabeçalho da requisição.
 *   Se o token estiver ausente ou inválido, retorna uma resposta de erro.
 *   Se o token for válido, chama o próximo middleware na cadeia.
 * @throws {Error} - Lança um erro se o token estiver ausente ou inválido.
 */

export const verifyToken = (req, res, next) => {
  // Extrai o token de autorização do cabeçalho da requisição
  const token = req.headers.authorization;
  
  // Verifica se o token está ausente
  if (!token) {
    return res.status(400).json({ message: 'Token missing' });
  }

  // Verifica a validade do token utilizando a chave secreta
  jwt.verify(token, '3dc190e6-b357-4bc0-8175-7561790a4ada', (error, decode) => {
    // Se ocorrer um erro durante a verificação, retorna uma resposta de erro com status 498
    if (error) {
      return res.status(498).json({ message: 'Invalid token' });
    } else {
      // Se o token for válido, chama o próximo middleware na cadeia
      next();
    }
  });
};
