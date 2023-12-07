import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { GuestOperations } from "../model/guestModel.js";

export const deleteGuest = async (req, res) => {
  // Extrai o endereço de e-mail da requisição
  const { email } = req.body;

  try {
    // Procura um hóspede no banco de dados com o mesmo endereço de e-mail
    const guestAlreadyExists = await GuestOperations.find({ email });

    // Se o hóspede não existe, lança um erro
    if (!guestAlreadyExists[0]) {
      throw new Error("Guest does not exist");
    }

    // Exclui o hóspede com base no endereço de e-mail
    const guestDeleted = await GuestOperations.deleteOne({
      email: guestAlreadyExists[0].email,
    });

    // Se o hóspede foi excluído com sucesso, retorna uma resposta JSON com status 200
    if (guestDeleted.deletedCount !== 0) {
      res.status(200).json({
        message: "Guest deleted",
      });
    }
  } catch (error) {
    // Se ocorrer algum erro durante o processamento, retorna uma resposta de erro com status 500
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};

export const updateGuest = async (req, res) => {
  // Extrai o ID do hóspede a ser atualizado dos parâmetros da requisição
  const { id } = req.params;

  // Extrai o token de autorização e as informações do hóspede a serem atualizadas do corpo da requisição
  const token = req.headers.authorization;
  const { email, name, cpf, birthDate, password } = req.body;

  try {
    // Busca o hóspede no banco de dados com base no ID fornecido
    const guest = await GuestOperations.findById(id);

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

    // Verifica se o hóspede associado ao token é o mesmo que está sendo atualizado
    if (guest.email === sub) {

      // Gera um hash da senha do hóspede usando bcrypt
      const passwordHash = await bcryptjs.hash(password, 8);

      // Atualiza as informações do hóspede no banco de dados
      const guestUpdated = await GuestOperations.findByIdAndUpdate(id, {
        email,
        name,
        cpf,
        birth_date: birthDate,
        password: passwordHash,
      });

      // Retorna uma resposta JSON com status 200 e os dados do hóspede atualizado
      return res.status(200).json({ data: guestUpdated });
    } else {
      // Se o hóspede não puder ser atualizado, retorna uma resposta de erro com status 400
      return res.status(400).json({ message: "Unable to update guest" });
    }
  } catch (error) {
    // Se ocorrer algum erro durante o processamento, retorna uma resposta de erro com status 500
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};