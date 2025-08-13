const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const auth = require('../middleware/auth');
const { empresaLimiter, ipLimiter } = require('../middleware/rateLimitAi');

router.post('/chat', auth, empresaLimiter, ipLimiter, aiController.chat);
router.post('/embed', auth, empresaLimiter, ipLimiter, aiController.embed);

module.exports = router;
