jest.mock('../models/user');

const request = require('supertest');
const app = require('../app');

beforeAll(async () => {
  process.env.JWT_SECRET = 'testsecret';
  await request(app).post('/api/auth/registro').send({
    nombre: 'Auth',
    email: 'auth@correo.com',
    contraseña: '123456'
  });
});

describe('Auth API', () => {
  it('debería iniciar sesión y devolver token', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'auth@correo.com',
      contraseña: '123456'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.usuario.email).toBe('auth@correo.com');
  });
});
