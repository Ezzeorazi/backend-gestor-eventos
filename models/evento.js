const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const eventoSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    descripcion: { type: String },
    fecha: { type: Date },
    usuario: { type: ObjectId, ref: 'user', required: true },
    invitaciones: [{ type: ObjectId, ref: 'Invitacion' }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Evento', eventoSchema);

