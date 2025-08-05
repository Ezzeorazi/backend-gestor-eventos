// app.js
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/eventos');
const invitationRoutes = require('./routes/invitaciones');
const planRoutes = require('./routes/planes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.get('/', (req, res) => res.send('API funcionando correctamente 🚀'));
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/eventos', eventRoutes);
app.use('/api', invitationRoutes);
app.use('/api', planRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});
// Error genérico
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
});

module.exports = app;
