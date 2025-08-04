// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gestor-eventos';
    await mongoose.connect(uri);
    console.log('MongoDB conectado correctamente 🔥');
  } catch (error) {
    console.error('Error conexión MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

