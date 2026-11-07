# Frontend – Gestor de Tareas

Aplicación de una sola página hecha con React y Vite que consume la API del backend.

## Tecnologías

- React 19 · React Router
- Vite
- Bootstrap 5
- ESLint

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `VITE_API_URL` | URL base de la API, terminada en `/api` |

En local, crea `frontend/.env.local`:

```
VITE_API_URL=http://localhost:5000/api
```

En producción (Vercel) se configura en **Settings → Environment Variables**.

## Cómo correrlo

Necesitas Node.js 20 o superior y el backend corriendo.

```bash
cd frontend
npm install
npm run dev
```

La app queda en http://localhost:5173

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Genera la versión de producción |
| `npm run preview` | Sirve localmente la versión de producción |
| `npm run lint` | Revisa el código con ESLint |

## Estructura

```
src/
├── services/
│   └── api.js   # Llamadas a la API (autenticación y tareas)
└── [completa con tus carpetas: pages, components, etc.]
```

## Cómo funciona

- Las llamadas a la API están centralizadas en `src/services/api.js`.
- Al iniciar sesión, el token JWT se guarda en `localStorage` y se envía en el encabezado `Authorization` en cada petición a las rutas de tareas.
- [Describe en una o dos líneas cómo proteges las rutas o cómo navegas entre pantallas.]

## Despliegue

Desplegado en Vercel: https://gestor-de-tareas-navy.vercel.app/

## Mejoras pendientes

- Guardar el token en una cookie `httpOnly` en lugar de `localStorage`
- Pruebas de componentes