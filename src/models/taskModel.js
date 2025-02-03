let tasks = []; // Simula um banco de dados em memória

const Task = {
  getAll: () => tasks,
  getById: (id) => tasks.find(task => task.id === id),
  create: (task) => {
    tasks.push(task);
    return task;
  },
  update: (id, updatedTask) => {
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updatedTask };
      return tasks[index];
    }
    return null;
  },
  delete: (id) => {
    tasks = tasks.filter(task => task.id !== id);
    return true;
  }
};

module.exports = Task;