# Projeto-Web-Back
Sistema de Hotelaria Desenvolvido utilizando Express

# Guia de instalação e de configuração

**Guia de Instalação**

1. **Clonar o Repositório:**
   ```bash
   git clone https://github.com/leogaarciaaa/Projeto-Web-Back.git
   cd Projeto-Web-Back/
   cd projeto-backend/
   ```

2. **Instalar Dependências:**
   Certifique-se de ter o Node.js instalado. Execute o seguinte comando para instalar as dependências:
   ```bash
   npm install
   ```
   
3. **Verificar porta:**
   Por padrão, a aplicação irá rodar na porta 3000, mas você pode alterar no arquivo .env na raíz do projeto. Certifique-se de ter o MongoDB instalado na sua máquina antes de rodar

4. **Configurar o Swagger:**
   Digite o comando abaixo para gerar a documentação:
   ```bash
   npm run swagger-autogen
   ```

4. **Executar a Aplicação:**
   ```bash
   npm start
   ```
   
5. **Instalar API:**
   Acesse a rota abaixo para popular o banco de dados automaticamente:
   ```bash
   localhost:3000/install
   ```

7. **Acessar Documentação:**
   Para acessar a documentação swagger, acesse a rota:
   ```bash
   localhost:3000/docs
   ```

# Importante

  Para acessar como Admin, é necessário criar uma conta de Admin e realizar o login. O mesmo vale para o acesso como Guest. O Admin pode criar novos quartos, excluir guests e usuários não-Admin, entre outras funções. O Guest pode criar novas reservas (bookings), atualizar seus dados, avaliar uma hospedagem (feedback), etc.
