const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');

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
app.use('/api/usuarios', userRoutes);



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