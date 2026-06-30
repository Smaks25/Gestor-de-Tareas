const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Crea el archivo de la base de datos (o se conecta si ya existe)
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite.');
  }
});

// Inicializar tablas
db.serialize(() => {
  // Tabla de usuarios
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`);

  // Tabla de tareas
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    dueDate TEXT,
    priority TEXT,
    status TEXT DEFAULT 'Pendiente',
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);
});

module.exports = db;
