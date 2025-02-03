const sqlite3 = require('sqlite3').verbose();

// Conecta ao banco de dados 
const db = new sqlite3.Database('./database.db');

// Cria a tabela de tarefas 
// Se a tabela já existe ele irá usar uma existente, caso contrario uma nova é criada

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed BOOLEAN DEFAULT FALSE
    )
  `);
});



module.exports = db;