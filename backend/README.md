# Backend – Gestor de Tareas

API REST hecha con Node.js, Express y SQLite. Maneja el registro y login de usuarios con JWT y el CRUD de tareas por usuario.

## Tecnologías

- Node.js 20 · Express 5
- SQLite (`sqlite3`)
- `bcrypt` para cifrar contraseñas
- `jsonwebtoken` para la autenticación
- `cors`

## Estructura

```
backend/
├── server.js   # Rutas, autenticación y arranque del servidor
├── db.js       # Conexión a SQLite y creación de tablas
└── package.json
```

## Variables de entorno

| Variable | Obligatoria | Descripción |
|----------|-------------|-------------|
| `JWT_SECRET` | Sí | Clave para firmar los tokens. El servidor no arranca sin ella. |
| `PORT` | No | Puerto del servidor (por defecto 5000). |

## Cómo correrlo en local

```bash
cd backend
npm install
```

Crea un archivo `.env` (está ignorado por Git) con:

```
JWT_SECRET=un_texto_largo_y_aleatorio
```

Y arranca:

```bash
node --env-file=.env server.js
```

La API queda en http://localhost:5000. La base de datos (`database.sqlite`) se crea sola al iniciar.

## Endpoints

Las rutas protegidas requieren el encabezado `Authorization: Bearer <token>`.

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/api/auth/register` | No | Registra un usuario |
| POST | `/api/auth/login` | No | Inicia sesión y devuelve un token JWT (24 h) |
| GET | `/api/tasks` | Sí | Lista las tareas del usuario |
| POST | `/api/tasks` | Sí | Crea una tarea |
| PUT | `/api/tasks/:id` | Sí | Actualiza una tarea |
| DELETE | `/api/tasks/:id` | Sí | Elimina una tarea |

### Ejemplos

Registro:

```json
POST /api/auth/register
{ "username": "ana", "password": "mi_clave" }
```

Crear tarea:

```json
POST /api/tasks
{
  "title": "Estudiar Docker",
  "description": "Repasar el Dockerfile de la API",
  "dueDate": "2026-11-20",
  "priority": "Alta",
  "status": "Pendiente"
}
```

Si no se envían `priority` ni `status`, se guardan como `Media` y `Pendiente`.

Respuestas de error comunes: `400` datos faltantes, `401` credenciales o token ausente, `403` token inválido o expirado, `404` tarea no encontrada o de otro usuario.

## Base de datos

- **users:** `id`, `username` (único), `password` (hash)
- **tasks:** `id`, `user_id`, `title`, `description`, `dueDate`, `priority`, `status`

## Seguridad

- Las contraseñas se guardan con hash (bcrypt), nunca en texto plano.
- Las consultas usan parámetros, lo que evita inyección SQL.
- Cada consulta de tareas filtra por `user_id`, así un usuario no puede ver ni modificar las tareas de otro.

## Limitaciones conocidas

- SQLite en un disco temporal (plan gratuito de Render): los datos pueden perderse al reiniciar.
- CORS abierto a cualquier origen.
- Sin pruebas automáticas ni límite de intentos de login.