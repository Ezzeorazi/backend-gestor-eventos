jest.mock('../models/user');
jest.mock('../models/evento');

const request = require('supertest');
const app = require('../app');

let token;

beforeAll(async () => {
  process.env.JWT_SECRET = 'testsecret';
  await request(app).post('/api/auth/registro').send({
    nombre: 'Evento',
    email: 'evento@correo.com',
    password: '123456'
  });
  const resLogin = await request(app).post('/api/auth/login').send({
    email: 'evento@correo.com',
    password: '123456'
  });
  token = resLogin.body.token;
});

describe('Eventos API', () => {
  it('debería crear un evento', async () => {
    const res = await request(app)
      .post('/api/eventos')
      .set('Authorization', `Bearer ${token}`)
      .send({ titulo: 'Mi evento' });
    expect(res.statusCode).toBe(201);
    expect(res.body.titulo).toBe('Mi evento');
  });

  it('debería listar los eventos del usuario', async () => {
    const res = await request(app)
      .get('/api/eventos')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].titulo).toBe('Mi evento');
  });
});
