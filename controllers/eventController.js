const Evento = require('../models/evento');

// Listar eventos del usuario autenticado
exports.listarEventos = async (req, res) => {
  try {
    const eventos = await Evento.find({ usuario: req.usuario.id });
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar eventos', error: error.message });
  }
};

// Obtener un evento específico
exports.obtenerEvento = async (req, res) => {
  try {
    const evento = await Evento.findOne({ _id: req.params.id, usuario: req.usuario.id });
    if (!evento) return res.status(404).json({ mensaje: 'Evento no encontrado' });
    res.json(evento);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener evento', error: error.message });
  }
};

// Crear evento
exports.crearEvento = async (req, res) => {
  try {
    const evento = new Evento({ ...req.body, usuario: req.usuario.id });
    await evento.save();
    res.status(201).json(evento);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear evento', error: error.message });
  }
};

// Actualizar evento
exports.actualizarEvento = async (req, res) => {
  try {
    const evento = await Evento.findOneAndUpdate(
      { _id: req.params.id, usuario: req.usuario.id },
      req.body,
      { new: true }
    );
    if (!evento) return res.status(404).json({ mensaje: 'Evento no encontrado' });
    res.json(evento);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar evento', error: error.message });
  }
};

// Eliminar evento
exports.eliminarEvento = async (req, res) => {
  try {
    const evento = await Evento.findOneAndDelete({ _id: req.params.id, usuario: req.usuario.id });
    if (!evento) return res.status(404).json({ mensaje: 'Evento no encontrado' });
    res.json({ mensaje: 'Evento eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar evento', error: error.message });
  }
};

