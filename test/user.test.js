const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const User = require('../models/user'); // <-- Agrega esta línea

beforeAll(async () => {
  await User.deleteOne({ email: 'test@correo.com' });
});

describe('User API', () => {
  it('debería registrar un usuario', async () => {
    const res = await request(app)
      .post('/api/auth/registro')
      .send({
        nombre: 'Test',
        email: 'test@correo.com',
        contraseña: '123456'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.mensaje).toBe('Usuario registrado correctamente');
  });

  afterAll(async () => {
    await User.deleteOne({ email: 'test@correo.com' });
    await mongoose.connection.close();
  });
});