import bcryptjs from "bcryptjs";
import { User, UserOperations } from "../model/userModel.js";
import jwt from "jsonwebtoken";


export const deleteUser = async (req, res) => {
  // Extrai o endereço de e-mail da requisição
  const { email } = req.body;

  try {
    // Procura um usuário no banco de dados com o mesmo endereço de e-mail
    const userAlreadyExists = await UserOperations.find({ email });

    // Se o usuário não existe, lança um erro
    if (!userAlreadyExists[0]) {
      throw new Error("User does not exist");
    }

    // Exclui o usuário com base no endereço de e-mail
    const userDeleted = await UserOperations.deleteOne({
      email: userAlreadyExists[0].email,
    });

    // Se o usuário foi excluído com sucesso, retorna uma resposta JSON com status 200
    if (userDeleted.deletedCount !== 0) {
      res.status(200).json({
        message: "User deleted",
      });
    }
  } catch (error) {
    // Se ocorrer algum erro durante o processamento, retorna uma resposta de erro com status 500
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};

export const updateUser = async (req, res) => {
  // Extrai o ID do usuário a ser atualizado dos parâmetros da requisição
  const { id } = req.params;

  // Extrai o token de autorização e as informações do usuário a serem atualizadas do corpo da requisição
  const token = req.headers.authorization;
  const { email, name, password } = req.body;

  try {
    // Busca o usuário no banco de dados com base no ID fornecido
    const user = await User.findById(id);

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

    // Verifica se o usuário associado ao token é o mesmo que está sendo atualizado
    if (user.email === sub) {

      // Gera um hash da senha do usuário usando bcrypt
      const passwordHash = await bcryptjs.hash(password, 8);

      // Atualiza as informações do usuário no banco de dados
      const userUpdated = await User.findByIdAndUpdate(id, {
        email,
        name,
        password: passwordHash,
      });

      // Retorna uma resposta JSON com status 200 e os dados do usuário atualizado
      return res.status(200).json({ data: userUpdated });
    } else {
      // Se o usuário não puder ser atualizado, retorna uma resposta de erro com status 400
      return res.status(400).json({ message: "Unable to update user" });
    }
  } catch (error) {
    // Se ocorrer algum erro durante o processamento, retorna uma resposta de erro com status 500
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};


export const updateUserAndAdmin = async (req, res) => {

  // Extrai o ID do usuário a ser atualizado dos parâmetros da requisição
  const { id } = req.params;

  // Extrai as informações do usuário a serem atualizadas do corpo da requisição
  const { email, name, password } = req.body;

  try {
    // Gera um hash da senha do usuário usando bcrypt
    const passwordHash = await bcryptjs.hash(password, 8);

    // Atualiza as informações do usuário no banco de dados com base no ID fornecido
    const userUpdated = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: passwordHash,
    });

    // Retorna uma resposta JSON com status 200 e os dados do usuário atualizado
    return res.status(200).json({ data: userUpdated });
  } catch (error) {
    // Se ocorrer algum erro durante o processamento, retorna uma resposta de erro com status 500
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};
