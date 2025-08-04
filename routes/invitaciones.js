const express = require('express');
const router = express.Router();
const invitacionController = require('../controllers/invitacionController');
const auth = require('../middleware/auth');

router.get('/eventos/:eventoId/invitaciones', auth, invitacionController.listarInvitaciones);
router.post('/eventos/:eventoId/invitaciones', auth, invitacionController.agregarInvitacion);
router.put('/invitaciones/:id', auth, invitacionController.actualizarInvitacion);
router.get('/invitaciones/responder/:token', invitacionController.obtenerPorToken);

module.exports = router;

