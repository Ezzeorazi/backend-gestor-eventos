jest.mock('../models/user');

const request = require('supertest');
const app = require('../app');

beforeAll(() => {
  process.env.JWT_SECRET = 'testsecret';
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
});
