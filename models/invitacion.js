const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const invitacionSchema = new mongoose.Schema(
  {
    evento: { type: ObjectId, ref: 'Evento', required: true },
    email: { type: String, required: true },
    estado: {
      type: String,
      enum: ['pendiente', 'confirmada', 'rechazada'],
      default: 'pendiente'
    },
    token: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Invitacion', invitacionSchema);

