import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, UserOperations } from "../model/userModel.js";

export const register = async (req, res) => {
  // Extrai as informações do usuário do corpo da requisição
  const { name, email, password } = req.body;

  try {
    // Verifica se o usuário já existe no banco de dados com base no endereço de e-mail fornecido
    const userAlreadyExists = await UserOperations.find({ email });

    // Se o usuário já existir, lança um erro
    if (userAlreadyExists[0]) {
      throw new Error("User already exists");
    }

    // Gera um hash da senha do usuário usando bcrypt
    const passwordHash = await bcryptjs.hash(password, 8);

    // Cria um objeto de usuário com as informações fornecidas
    const user = {
      name,
      email,
      password: passwordHash,
      admin: false,
    };

    // Cria o usuário no banco de dados utilizando o modelo `User`
    const createdUser = await UserOperations.create(user);

    // Retorna uma resposta JSON com status 201 e os dados do usuário recém-criado
    return res.status(201).json({ data: createdUser });
  } catch (error) {
    // Se ocorrer algum erro durante o processamento, retorna uma resposta de erro com status 500
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};

export const login = async (req, res) => {
  // Extrai as informações do usuário do corpo da requisição
  const { email, password } = req.body;

  try {
    // Verifica se o usuário existe no banco de dados com base no endereço de e-mail fornecido
    const userAlreadyExists = await UserOperations.find({ email });

    // Se o usuário não existir, lança um erro
    if (!userAlreadyExists[0]) {
      throw new Error("Invalid credentials");
    }

    // Compara a senha fornecida com a senha armazenada no banco de dados usando bcrypt
    const passwordMatch = await bcryptjs.compare(
      password,
      userAlreadyExists[0].password
    );

    // Se as senhas não corresponderem, lança um erro
    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    // Gera um token JWT com o endereço de e-mail como subject e um tempo de expiração de 60 segundos
    const token = jwt.sign({}, process.env.SECRET_KEY, {
      subject: userAlreadyExists[0].email,
      expiresIn: "600s",
    });

    // Retorna uma resposta JSON com status 201 e o token gerado
    return res.status(201).json({ token });
  } catch (error) {
    // Se ocorrer algum erro durante o processamento, retorna uma resposta de erro com status 500
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};


export const registerAdmin = async (req, res) => {
  // Extrai as informações do usuário do corpo da requisição
  const { name, email, password } = req.body;

  try {
    // Verifica se o usuário já existe no banco de dados com base no endereço de e-mail fornecido
    const userAlreadyExists = await UserOperations.find({ email });

    // Se o usuário já existir, lança um erro
    if (userAlreadyExists[0]) {
      throw new Error("User already exists");
    }

    // Gera um hash da senha do usuário usando bcrypt
    const passwordHash = await bcryptjs.hash(password, 8);

    // Cria um objeto de usuário com as informações fornecidas e a flag 'admin' definida como true
    const user = {
      name,
      email,
      password: passwordHash,
      admin: true,
    };

    // Cria o usuário no banco de dados utilizando o modelo `User`
    const createdUser = await UserOperations.create(user);

    // Retorna uma resposta JSON com status 201 e os dados do usuário recém-criado
    return res.status(201).json({ data: createdUser });
  } catch (error) {
    // Se ocorrer algum erro durante o processamento, retorna uma resposta de erro com status 500
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};