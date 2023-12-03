import { User } from "../model/userModel.js";
import jwt from "jsonwebtoken";

/**
 * @function deleteUser
 * @async
 * @param {Object} req - Objeto de requisição Express.
 * @param {Object} res - Objeto de resposta Express.
 * @returns {Promise<void>} - Promessa que representa a conclusão da função.
 * @description
 *   Esta função é responsável por excluir um usuário com base no endereço de e-mail fornecido na requisição.
 *   Utiliza o modelo `User` para interagir com o banco de dados MongoDB.
 * @throws {Error} - Lança um erro se o usuário não existe no banco de dados.
 */
export const deleteUser = async (req, res) => {
  // Extrai o endereço de e-mail da requisição
  const { email } = req.body;

  try {
    // Procura um usuário no banco de dados com o mesmo endereço de e-mail
    const userAlreadyExists = await User.find({ email });

    // Se o usuário não existe, lança um erro
    if (!userAlreadyExists[0]) {
      throw new Error("User does not exist");
    }

    // Exclui o usuário com base no endereço de e-mail
    const userDeleted = await User.deleteOne({
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
    return res.status(500).json({ message: "Internal server error" });
  }
};


/**
 * @function updateUser
 * @async
 * @param {Object} req - Objeto de requisição Express.
 * @param {Object} res - Objeto de resposta Express.
 * @returns {Promise<void>} - Promessa que representa a conclusão da função.
 * @description
 *   Esta função é responsável por atualizar as informações de um usuário com base no ID fornecido na requisição.
 *   Utiliza o modelo `User` para interagir com o banco de dados MongoDB.
 *   Verifica se o usuário que está tentando atualizar é o mesmo associado ao token de autorização.
 * @throws {Error} - Lança um erro se o token de autorização for inválido ou se o usuário não puder ser atualizado.
 */
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
      "3dc190e6-b357-4bc0-8175-7561790a4ada",
      (error, _) => {
        if (error) {
          // Se ocorrer um erro durante a decodificação, retorna uma resposta de erro com status 498
          return res.status(498).json({ message: "Invalid token" });
        }
      }
    );

    // Verifica se o usuário associado ao token é o mesmo que está sendo atualizado
    if (user.email === sub) {
      // Atualiza as informações do usuário no banco de dados
      const userUpdated = await User.findByIdAndUpdate(id, {
        email,
        name,
        password,
      });

      // Retorna uma resposta JSON com status 200 e os dados do usuário atualizado
      return res.status(200).json({ data: userUpdated });
    } else {
      // Se o usuário não puder ser atualizado, retorna uma resposta de erro com status 400
      return res.status(400).json({ message: "Unable to update user" });
    }
  } catch (error) {
    // Se ocorrer algum erro durante o processamento, retorna uma resposta de erro com status 500
    return res.status(500).json({ message: "Internal server error" });
  }
};


/**
 * @function updateUserAndAdmin
 * @async
 * @param {Object} req - Objeto de requisição Express.
 * @param {Object} res - Objeto de resposta Express.
 * @returns {Promise<void>} - Promessa que representa a conclusão da função.
 * @description
 *   Esta função é responsável por atualizar as informações de um usuário com base no ID fornecido na requisição.
 *   Utiliza o modelo `User` para interagir com o banco de dados MongoDB.
 *   Esta função não impõe verificações específicas sobre permissões ou autenticação.
 * @throws {Error} - Lança um erro se ocorrer um problema durante a atualização do usuário.
 */
export const updateUserAndAdmin = async (req, res) => {
  // Extrai o ID do usuário a ser atualizado dos parâmetros da requisição
  const { id } = req.params;

  // Extrai as informações do usuário a serem atualizadas do corpo da requisição
  const { email, name, password } = req.body;

  try {
    // Atualiza as informações do usuário no banco de dados com base no ID fornecido
    const userUpdated = await User.findByIdAndUpdate(id, {
      name,
      email,
      password,
    });

    // Retorna uma resposta JSON com status 200 e os dados do usuário atualizado
    return res.status(200).json({ data: userUpdated });
  } catch (error) {
    // Se ocorrer algum erro durante o processamento, retorna uma resposta de erro com status 500
    return res.status(500).json({ message: "Internal server error" });
  }
};
