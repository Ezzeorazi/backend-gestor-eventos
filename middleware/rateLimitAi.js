const rateLimit = require('express-rate-limit');

const { ipKeyGenerator } = rateLimit; // helper para IPv6

const empresaLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 60,
  keyGenerator: req => req.usuario?.empresaId || ipKeyGenerator(req),
  message: 'Límite de solicitudes AI por empresa excedido'
});

const ipLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: 'Límite de solicitudes AI por IP excedido'
});

module.exports = { empresaLimiter, ipLimiter };
