import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Extrai o token de autorização do cabeçalho da requisição
  const token = req.headers.authorization;
  
  // Verifica se o token está ausente
  if (!token) {
    return res.status(400).json({ message: 'Token missing' });
  }

  // Verifica a validade do token utilizando a chave secreta
  jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
    // Se ocorrer um erro durante a verificação, retorna uma resposta de erro com status 498
    if (error) {
      return res.status(498).json({ message: 'Invalid token' });
    } else {
      // Se o token for válido, chama o próximo middleware na cadeia
      next();
    }
  });
};
