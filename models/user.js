const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Email inválido']
  },
  contraseña: {
    type: String,
    required: true
  },
  plan: { type: ObjectId, ref: "Plan" },
  eventos: [{ type: ObjectId, ref: "Evento" }]
}, {
  timestamps: true
});

// Hashear contraseña 
userSchema.pre('save', async function(next) {
  if (!this.isModified('contraseña')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.contraseña = await bcrypt.hash(this.contraseña, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Método para comparar contraseñas
userSchema.methods.compararContraseña = function(contraseña) {
  return bcrypt.compare(contraseña, this.contraseña);
};

module.exports = mongoose.model('user', userSchema);