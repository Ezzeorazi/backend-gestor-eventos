const Plan = require('../models/plan');
const User = require('../models/user');

// Listar planes disponibles
exports.listarPlanes = async (req, res) => {
  try {
    const planes = await Plan.find();
    res.json(planes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar planes', error: error.message });
  }
};

// Seleccionar plan para un usuario
exports.seleccionarPlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.body.planId);
    if (!plan) return res.status(404).json({ mensaje: 'Plan no encontrado' });
    const usuario = await User.findByIdAndUpdate(
      req.params.id,
      { plan: plan._id },
      { new: true }
    );
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al seleccionar plan', error: error.message });
  }
};

