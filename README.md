# Gestor de Eventos - Backend

API REST construida con **Node.js**, **Express** y **MongoDB** para gestionar usuarios, eventos, invitaciones y planes de suscripción. El proyecto muestra buenas prácticas de desarrollo backend y está orientado a clientes o reclutadores que deseen evaluar mi trabajo.

## Características
- Autenticación de usuarios con **JWT** y cifrado de passwords con **bcryptjs**.
- CRUD completo de usuarios y eventos.
- Gestión de invitaciones con confirmación mediante enlace público.
- Selección de planes (gratuito o de pago) asociado a cada usuario.
- Configuración mediante variables de entorno y conexión a MongoDB.
- Middleware de autenticación que expone el usuario autenticado en `req.user` para un acceso más sencillo.

## Tecnologías
- Node.js
- Express 5
- MongoDB + Mongoose
- JSON Web Tokens
- bcryptjs
- CORS
- dotenv
- nodemon (desarrollo)

## Requisitos previos
- Node.js 18 o superior
- MongoDB en ejecución

## Instalación
```bash
git clone <URL_DEL_REPOSITORIO>
cd backend-gestor-eventos
npm install
```

## Configuración
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/gestor-eventos
JWT_SECRET=tu_clave_secreta
```

## Ejecución
- **Desarrollo:** `npm run dev`
- **Producción:** `npm start`

## Pruebas
Este proyecto incluye pruebas automatizadas con **Jest** y **Supertest** que verifican los principales endpoints de autenticación, usuarios, eventos, invitaciones y planes.

Para ejecutar la suite de pruebas utiliza:

```bash
npm test
```

Las pruebas se conectan a una base de datos en memoria y realizan peticiones HTTP reales contra la API, asegurando que las respuestas y códigos de estado sean los esperados.

## Endpoints principales
| Método | Ruta | Descripción |
|--------|------|-------------|
| **Auth** |||
| POST | `/api/auth/registro` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| **Usuarios** |||
| GET | `/api/usuarios` | Listar usuarios |
| GET | `/api/usuarios/:id` | Obtener usuario |
| PUT | `/api/usuarios/:id` | Actualizar usuario |
| **Eventos** |||
| GET | `/api/eventos` | Listar eventos del usuario |
| GET | `/api/eventos/:id` | Obtener evento |
| POST | `/api/eventos` | Crear evento |
| PUT | `/api/eventos/:id` | Actualizar evento |
| DELETE | `/api/eventos/:id` | Eliminar evento |
| **Invitaciones** |||
| GET | `/api/eventos/:eventoId/invitaciones` | Listar invitaciones |
| POST | `/api/eventos/:eventoId/invitaciones` | Agregar invitaciones |
| PUT | `/api/invitaciones/:id` | Confirmar invitación |
| GET | `/api/invitaciones/responder/:token` | Obtener invitación pública |
| **Planes** |||
| GET | `/api/planes` | Listar planes |
| POST | `/api/usuarios/:id/seleccionar-plan` | Seleccionar plan |

## Estructura del proyecto
```
controllers/   # Lógica de negocio
middleware/    # Middlewares (autenticación, etc.)
models/        # Modelos de Mongoose
routes/        # Definición de rutas
config/        # Configuración de la base de datos
index.js       # Punto de entrada de la aplicación
```

## Contribuciones
Las contribuciones son bienvenidas mediante issues o pull requests.

## Licencia
ISC
