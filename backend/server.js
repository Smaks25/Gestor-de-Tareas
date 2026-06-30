const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'super_secret_key_para_el_portafolio'; // En producción, usar variables de entorno (.env)

// Middleware
app.use(cors());
app.use(express.json());

// ==========================================
// RUTAS DE AUTENTICACIÓN
// ==========================================

// Registrar usuario
app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;

    db.run(sql, [username, hashedPassword], function (err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'El usuario ya existe' });
        }
        return res.status(500).json({ error: 'Error en la base de datos' });
      }
      res.status(201).json({ message: 'Usuario registrado exitosamente', userId: this.lastID });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Iniciar sesión
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
  }

  const sql = `SELECT * FROM users WHERE username = ?`;
  db.get(sql, [username], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Error en la base de datos' });
    if (!user) return res.status(401).json({ error: 'Credenciales incorrectas' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: 'Credenciales incorrectas' });

    // Generar Token JWT
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ message: 'Login exitoso', token, user: { id: user.id, username: user.username } });
  });
});

// Middleware para verificar el token JWT en las rutas protegidas
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer TOKEN"

  if (!token) return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido o expirado' });
    req.user = user; // Guardar la info del usuario en la request
    next();
  });
};

// ==========================================
// RUTAS DE TAREAS (Protegidas)
// ==========================================

// Obtener todas las tareas del usuario
app.get('/api/tasks', authenticateToken, (req, res) => {
  const sql = `SELECT * FROM tasks WHERE user_id = ? ORDER BY id DESC`;
  db.all(sql, [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener las tareas' });
    res.json(rows);
  });
});

// Crear una nueva tarea
app.post('/api/tasks', authenticateToken, (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;

  if (!title) return res.status(400).json({ error: 'El título es requerido' });

  const sql = `INSERT INTO tasks (user_id, title, description, dueDate, priority, status) VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [req.user.id, title, description, dueDate, priority || 'Media', status || 'Pendiente'];

  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: 'Error al crear la tarea' });

    // Devolver la tarea creada
    const newTask = { id: this.lastID, user_id: req.user.id, title, description, dueDate, priority, status: status || 'Pendiente' };
    res.status(201).json(newTask);
  });
});

// Actualizar una tarea
app.put('/api/tasks/:id', authenticateToken, (req, res) => {
  const taskId = req.params.id;
  const { title, description, dueDate, priority, status } = req.body;

  const sql = `UPDATE tasks SET title = ?, description = ?, dueDate = ?, priority = ?, status = ? WHERE id = ? AND user_id = ?`;
  const params = [title, description, dueDate, priority, status, taskId, req.user.id];

  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: 'Error al actualizar la tarea' });
    if (this.changes === 0) return res.status(404).json({ error: 'Tarea no encontrada o no autorizada' });

    res.json({ message: 'Tarea actualizada exitosamente' });
  });
});

// Eliminar una tarea
app.delete('/api/tasks/:id', authenticateToken, (req, res) => {
  const taskId = req.params.id;

  const sql = `DELETE FROM tasks WHERE id = ? AND user_id = ?`;
  db.run(sql, [taskId, req.user.id], function (err) {
    if (err) return res.status(500).json({ error: 'Error al eliminar la tarea' });
    if (this.changes === 0) return res.status(404).json({ error: 'Tarea no encontrada o no autorizada' });

    res.json({ message: 'Tarea eliminada exitosamente' });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor Backend corriendo en el puerto ${PORT}`);
});
