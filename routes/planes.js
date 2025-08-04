const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');
const auth = require('../middleware/auth');

router.get('/planes', planController.listarPlanes);
router.post('/usuarios/:id/seleccionar-plan', auth, planController.seleccionarPlan);

module.exports = router;

