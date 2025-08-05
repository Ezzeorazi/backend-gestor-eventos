jest.mock('../models/user');
jest.mock('../models/plan');

const request = require('supertest');
const app = require('../app');
const Plan = require('../models/plan');

let token;
let userId;
let planId;

beforeAll(async () => {
  process.env.JWT_SECRET = 'testsecret';
  await request(app).post('/api/auth/registro').send({
    nombre: 'PlanUser',
    email: 'plan@correo.com',
    contraseña: '123456'
  });
  const resLogin = await request(app).post('/api/auth/login').send({
    email: 'plan@correo.com',
    contraseña: '123456'
  });
  token = resLogin.body.token;
  userId = resLogin.body.usuario.id;
  const plan = await Plan.create({ nombre: 'Básico', descripcion: 'Plan básico', precio: 10 });
  planId = plan._id;
});

describe('Planes API', () => {
  it('debería listar los planes', async () => {
    const res = await request(app).get('/api/planes');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]._id).toBe(planId);
  });

  it('debería seleccionar un plan para el usuario', async () => {
    const res = await request(app)
      .post(`/api/usuarios/${userId}/seleccionar-plan`)
      .set('Authorization', `Bearer ${token}`)
      .send({ planId });
    expect(res.statusCode).toBe(200);
    expect(res.body.plan).toBe(planId);
  });
});
