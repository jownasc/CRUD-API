const db = require('../config/database'); // Importa a conexão com o banco de dados

const Task = {
  // Pega todas as tarefas
  getAll: (callback) => {
    db.all('SELECT * FROM tasks', callback);
  },

  // Pega uma tarefa pelo ID
  getById: (id, callback) => {
    db.get('SELECT * FROM tasks WHERE id = ?', [id], callback);
  },

  // Cria uma nova tarefa
  create: (task, callback) => {
    const { title, completed } = task;
    db.run(
      'INSERT INTO tasks (title, completed) VALUES (?, ?)',
      [title, completed],
      function (err) {
        if (err) return callback(err);
        callback(null, { id: this.lastID, title, completed });
      }
    );
  },

  // Atualiza uma tarefa existente
  update: (id, updatedTask, callback) => {
    const { title, completed } = updatedTask;
    db.run(
      'UPDATE tasks SET title = ?, completed = ? WHERE id = ?',
      [title, completed, id],
      function (err) {
        if (err) return callback(err);
        callback(null, { id, title, completed });
      }
    );
  },

  // Deleta uma tarefa
  delete: (id, callback) => {
    db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
      if (err) return callback(err);
      callback(null, { changes: this.changes });
    });
  },
};

module.exports = Task;