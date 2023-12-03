import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";

/**
 * @function register
 * @async
 * @param {Object} req - Objeto de requisição Express.
 * @param {Object} res - Objeto de resposta Express.
 * @returns {Promise<void>} - Promessa que representa a conclusão da função.
 * @description
 *   Esta função é responsável por registrar um novo usuário na aplicação.
 *   Recebe informações do usuário, como nome, e-mail e senha, do corpo da requisição.
 *   Realiza verificações para garantir que o usuário não exista previamente no banco de dados.
 *   Cria um hash da senha do usuário usando bcrypt antes de armazená-la no banco de dados.
 *   Cria o usuário no banco de dados utilizando o modelo `User`.
 * @throws {Error} - Lança um erro se o usuário já existir ou se ocorrer um problema durante o processo de registro.
 */
export const register = async (req, res) => {
  // Extrai as informações do usuário do corpo da requisição
  const { name, email, password } = req.body;

  try {
    // Verifica se o usuário já existe no banco de dados com base no endereço de e-mail fornecido
    const userAlreadyExists = await User.find({ email });

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
    const createdUser = await User.create(user);

    // Retorna uma resposta JSON com status 201 e os dados do usuário recém-criado
    return res.status(201).json({ data: createdUser });
  } catch (error) {
    // Se ocorrer algum erro durante o processamento, retorna uma resposta de erro com status 500
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @function login
 * @async
 * @param {Object} req - Objeto de requisição Express.
 * @param {Object} res - Objeto de resposta Express.
 * @returns {Promise<void>} - Promessa que representa a conclusão da função.
 * @description
 *   Esta função é responsável por autenticar um usuário com base nas credenciais fornecidas (e-mail e senha).
 *   Verifica se o usuário existe no banco de dados e se a senha fornecida corresponde à senha armazenada no banco.
 *   Se a autenticação for bem-sucedida, gera um token JWT e o retorna na resposta.
 * @throws {Error} - Lança um erro se as credenciais forem inválidas ou se ocorrer um problema durante o processo de autenticação.
 */
export const login = async (req, res) => {
  // Extrai as informações do usuário do corpo da requisição
  const { email, password } = req.body;

  try {
    // Verifica se o usuário existe no banco de dados com base no endereço de e-mail fornecido
    const userAlreadyExists = await User.find({ email });

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
    const token = jwt.sign({}, "3dc190e6-b357-4bc0-8175-7561790a4ada", {
      subject: userAlreadyExists[0].email,
      expiresIn: "60s",
    });

    // Retorna uma resposta JSON com status 201 e o token gerado
    return res.status(201).json({ token });
  } catch (error) {
    // Se ocorrer algum erro durante o processamento, retorna uma resposta de erro com status 500
    return res.status(500).json({ message: "Internal server error" });
  }
};


/**
 * @function registerAdmin
 * @async
 * @param {Object} req - Objeto de requisição Express.
 * @param {Object} res - Objeto de resposta Express.
 * @returns {Promise<void>} - Promessa que representa a conclusão da função.
 * @description
 *   Esta função é responsável por registrar um novo usuário como administrador na aplicação.
 *   Recebe informações do usuário, como nome, e-mail e senha, do corpo da requisição.
 *   Realiza verificações para garantir que o usuário não exista previamente no banco de dados.
 *   Cria um hash da senha do usuário usando bcrypt antes de armazená-la no banco de dados.
 *   Cria o usuário no banco de dados com a flag 'admin' definida como true utilizando o modelo `User`.
 * @throws {Error} - Lança um erro se o usuário já existir ou se ocorrer um problema durante o processo de registro.
 */
export const registerAdmin = async (req, res) => {
  // Extrai as informações do usuário do corpo da requisição
  const { name, email, password } = req.body;

  try {
    // Verifica se o usuário já existe no banco de dados com base no endereço de e-mail fornecido
    const userAlreadyExists = await User.find({ email });

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
    const createdUser = await User.create(user);

    // Retorna uma resposta JSON com status 201 e os dados do usuário recém-criado
    return res.status(201).json({ data: createdUser });
  } catch (error) {
    // Se ocorrer algum erro durante o processamento, retorna uma resposta de erro com status 500
    return res.status(500).json({ message: "Internal server error" });
  }
};