const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/eventos');
const invitationRoutes = require('./routes/invitaciones');
const planRoutes = require('./routes/planes');

// Configurar dotenv
dotenv.config();

// Conectar a MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rutas principales (puedes importar tus rutas aquí)
app.get('/', (req, res) => {
  res.send('API funcionando correctamente 🚀');
});
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/eventos', eventRoutes);
app.use('/api', invitationRoutes);
app.use('/api', planRoutes);
// Manejo de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});
