const mongoose = require('mongoose');

const planSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String },
    precio: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Plan', planSchema);

