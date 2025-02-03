const Task = require('../models/taskModel');

// Pega todas as tarefas
exports.getAllTasks = (req, res) => {
  const tasks = Task.getAll();
  res.json(tasks);
};

// Pega uma tarefa pelo ID
exports.getTaskById = (req, res) => {
  const task = Task.getById(req.params.id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).send('Tarefa não encontrada');
  }
};

// Cria uma nova tarefa
exports.createTask = (req, res) => {
  const newTask = Task.create(req.body);
  res.status(201).json(newTask);
};

// Atualiza uma tarefa existente
exports.updateTask = (req, res) => {
  const updatedTask = Task.update(req.params.id, req.body);
  if (updatedTask) {
    res.json(updatedTask);
  } else {
    res.status(404).send('Tarefa não encontrada');
  }
};

// Deleta uma tarefa
exports.deleteTask = (req, res) => {
  const deleted = Task.delete(req.params.id);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).send('Tarefa não encontrada');
  }
};