const Task = require('../models/taskModel');

// Pega todas as tarefas
exports.getAllTasks = (req, res) => {
  Task.getAll((err, tasks) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
    res.json(tasks);
  });
};

// Pega uma tarefa pelo ID
exports.getTaskById = (req, res) => {
  const taskId = req.params.id;
  Task.getById(taskId, (err, task) => {
    if (err || !task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    res.json(task);
  });
};


// Cria uma nova tarefa
exports.createTask = (req, res) => {
  const { title, completed } = req.body;

  // Validação do titulo
  if (!title) {
    return res.status(400).json({ error: 'O título da tarefa é obrigatório' });
  }

  // Validação de tipos de dados
  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'O campo "completed" deve ser um booleano (true ou false)' });
  }

  // Cria a tarefa após os requisitos
  Task.create({ title, completed: completed || false }, (err, newTask) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao criar tarefa' });
    }
    res.status(201).json(newTask);
  });
};

// Atualiza uma tarefa existente
exports.updateTask = (req, res) => {
  const taskId = req.params.id;
  const { title, completed } = req.body;

  // Validação de tipos de dados
  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'O campo "completed" deve ser um booleano (true ou false)' });
  }

  // Chama o modelo para atualizar a tarefa
  Task.update(taskId, { title, completed }, (err, updatedTask) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
    if (!updatedTask) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    res.json(updatedTask);
  });
};

// Deleta uma tarefa
exports.deleteTask = (req, res) => {
  const taskId = req.params.id;

  Task.delete(taskId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao deletar tarefa' });
    }
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    res.status(204).send(); // Resposta sem conteúdo (sucesso)
  });
};