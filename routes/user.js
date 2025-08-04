const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/', auth, userController.listarUsuarios);
router.get('/:id', auth, userController.obtenerUsuarioPorId);
router.put('/:id', auth, userController.actualizarUsuario);

module.exports = router;

