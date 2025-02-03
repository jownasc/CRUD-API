// Importa o express e o dotenv
const express = require('express');
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Cria uma instância do Express
const app = express();

// Define a porta a partir do .env ou usa 3000 como padrão
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rota de teste para verificar se a API está funcionando
app.get('/', (req, res) => {
  res.send('API CRUD funcionando!');
});

// Importa as rotas de tarefas
const taskRoutes = require('./routes/taskRoutes');

// Usa as rotas de tarefas no caminho /tasks
app.use('/tasks', taskRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});