# Gestor de Eventos - Backend

## Conexión a MongoDB local con Compass
1. Instala [MongoDB Compass](https://www.mongodb.com/try/download/compass).
2. Abre Compass y usa la cadena de conexión:
   ```
   mongodb://127.0.0.1:27017/gestor-eventos
   ```
   Puedes cambiar `gestor-eventos` por otro nombre de base de datos si lo necesitas.

## Endpoints

### 🔑 Auth
- **POST** `/api/auth/registro` → Registro usuario.
- **POST** `/api/auth/login` → Inicio sesión.

### 👤 Usuarios
- **GET** `/api/usuarios` → Listar usuarios.

- **GET** `/api/usuarios/:id` → Perfil usuario.
- **PUT** `/api/usuarios/:id` → Actualizar usuario.

### 📅 Eventos
- **GET** `/api/eventos` → Listar eventos usuario autenticado.
- **GET** `/api/eventos/:id` → Obtener evento específico.
- **POST** `/api/eventos` → Crear evento.
- **PUT** `/api/eventos/:id` → Actualizar evento.
- **DELETE** `/api/eventos/:id` → Eliminar evento.

### 📧 Invitaciones
- **GET** `/api/eventos/:eventoId/invitaciones` → Listar invitaciones por evento.
- **POST** `/api/eventos/:eventoId/invitaciones` → Añadir invitaciones a evento.
- **PUT** `/api/invitaciones/:id` → Actualizar invitación (confirmación invitado).
- **GET** `/api/invitaciones/responder/:token` → Obtener invitación desde enlace público.

### 💳 Planes
- **GET** `/api/planes` → Listar planes disponibles.
- **POST** `/api/usuarios/:id/seleccionar-plan` → Usuario selecciona plan (pago o gratuito).

