import mongoose from 'mongoose';
/**
 * @module userModel
 * @description
 *   Módulo que define o esquema de usuário e o modelo associado para interação com o banco de dados MongoDB.
 *   Utiliza a biblioteca mongoose para a modelagem de dados e a conexão com o banco de dados.
 */

/**
 * Esquema de usuário para representar a estrutura de dados no banco de dados.
 * @name userSchema
 * @type {object}
 * @memberof module:userModel
 */
const userSchema = mongoose.Schema(
  {
    // Nome do usuário
    name: {
      type: String,
      required: [true, 'Name is required'], // Campo obrigatório
    },
    // Endereço de e-mail do usuário
    email: {
      type: String,
      required: [true, 'Email is required'], // Campo obrigatório
    },
    // Senha do usuário
    password: {
      type: String,
      required: [true, 'Password is required'], // Campo obrigatório
    },
    // Indica se o usuário possui privilégios de administrador
    admin: {
      type: Boolean,
      required: [true, 'Admin status is required'], // Campo obrigatório
    },
  },
  {
    // Adiciona automaticamente os campos `createdAt` e `updatedAt` para rastreamento de tempo
    timestamps: true,
  }
);

/**
 * Modelo de usuário associado ao esquema de usuário.
 * @name User
 * @type {object}
 * @memberof module:userModel
 */
export const User = mongoose.model('User', userSchema);

/**
 * Exporta o esquema e o modelo para serem utilizados em outros módulos.
 * @type {object}
 * @memberof module:userModel
 */
export { userSchema, User };
