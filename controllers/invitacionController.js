const Invitacion = require('../models/invitacion');
const Evento = require('../models/evento');
const crypto = require('crypto');

// Listar invitaciones por evento
exports.listarInvitaciones = async (req, res) => {
  try {
    const invitaciones = await Invitacion.find({ evento: req.params.eventoId });
    res.json(invitaciones);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar invitaciones', error: error.message });
  }
};

// Añadir invitación a evento
exports.agregarInvitacion = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.eventoId);
    if (!evento) return res.status(404).json({ mensaje: 'Evento no encontrado' });
    const token = crypto.randomBytes(20).toString('hex');
    const invitacion = new Invitacion({ evento: evento._id, email: req.body.email, token });
    await invitacion.save();
    evento.invitaciones.push(invitacion._id);
    await evento.save();
    res.status(201).json(invitacion);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar invitación', error: error.message });
  }
};

// Actualizar invitación (confirmación invitado)
exports.actualizarInvitacion = async (req, res) => {
  try {
    const invitacion = await Invitacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!invitacion) return res.status(404).json({ mensaje: 'Invitación no encontrada' });
    res.json(invitacion);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar invitación', error: error.message });
  }
};

// Obtener invitación desde enlace público
exports.obtenerPorToken = async (req, res) => {
  try {
    const invitacion = await Invitacion.findOne({ token: req.params.token }).populate('evento');
    if (!invitacion) return res.status(404).json({ mensaje: 'Invitación no encontrada' });
    res.json(invitacion);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener invitación', error: error.message });
  }
};

exports.agregarInvitacionesMasivas = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.eventoId);
    if (!evento) return res.status(404).json({ mensaje: 'Evento no encontrado' });

    const emails = (req.body.emails || []).filter(Boolean); // ['a@mail.com','b@mail.com']
    if (!emails.length) return res.status(400).json({ mensaje: 'No hay emails para procesar' });

    const docs = await Promise.all(
      emails.map(async (email) => {
        const token = crypto.randomBytes(20).toString('hex');
        const inv = await Invitacion.create({ evento: evento._id, email, token });
        return inv;
      })
    );

    evento.invitaciones.push(...docs.map(d => d._id));
    await evento.save();

    res.status(201).json(docs);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar invitaciones', error: error.message });
  }
};

// GET /api/eventos  → del usuario autenticado
exports.listarEventos = async (req, res) => {
  try {
    const eventos = await Evento.find({ creador: req.usuario.id })
      .populate({ path: 'invitaciones', select: 'email estado token createdAt' })
      .sort({ createdAt: -1 });
    res.json(eventos);
  } catch (e) {
    res.status(500).json({ mensaje: 'Error al listar eventos', error: e.message });
  }
};
