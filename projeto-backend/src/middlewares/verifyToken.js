import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(400).json({ message: 'Token missing' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
    if (error) {
      return res.status(498).json({ message: 'Invalid token' });
    } else {
      next();
    }
  });
};
