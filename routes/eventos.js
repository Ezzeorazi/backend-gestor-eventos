const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middleware/auth');

router.get('/', auth, eventController.listarEventos);
router.get('/:id', auth, eventController.obtenerEvento);
router.post('/', auth, eventController.crearEvento);
router.put('/:id', auth, eventController.actualizarEvento);
router.delete('/:id', auth, eventController.eliminarEvento);

module.exports = router;

