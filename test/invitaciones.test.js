jest.mock('../models/user');
jest.mock('../models/evento');
jest.mock('../models/invitacion');

const request = require('supertest');
const app = require('../app');

let token;
let eventoId;
let invitacion;

beforeAll(async () => {
  process.env.JWT_SECRET = 'testsecret';
  await request(app).post('/api/auth/registro').send({
    nombre: 'Invitador',
    email: 'invitador@correo.com',
    password: '123456'
  });
  const resLogin = await request(app).post('/api/auth/login').send({
    email: 'invitador@correo.com',
    password: '123456'
  });
  token = resLogin.body.token;
  const resEvento = await request(app)
    .post('/api/eventos')
    .set('Authorization', `Bearer ${token}`)
    .send({ titulo: 'Evento Invitacion' });
  eventoId = resEvento.body._id;
});

describe('Invitaciones API', () => {
  it('debería agregar una invitación a un evento', async () => {
    const res = await request(app)
      .post(`/api/eventos/${eventoId}/invitaciones`)
      .set('Authorization', `Bearer ${token}`)
      .send({ email: 'invitado@correo.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe('invitado@correo.com');
    invitacion = res.body;
  });

  it('debería listar invitaciones de un evento', async () => {
    const res = await request(app)
      .get(`/api/eventos/${eventoId}/invitaciones`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]._id).toBe(invitacion._id);
  });

  it('debería obtener la invitación por token', async () => {
    const res = await request(app)
      .get(`/api/invitaciones/responder/${invitacion.token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('invitado@correo.com');
  });
});
