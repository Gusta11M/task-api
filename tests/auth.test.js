const request = require('supertest');
const app = require('../server');

describe('Auth: Register', () => {
  it('Deve registar um novo utilizador', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'João Silva',
        email: 'joao@example.com',
        password: '123456'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('joao@example.com');
  });
});

describe('Auth: Login', () => {

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123'
      });
  });

  it('Should login an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'johndoe@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('johndoe@example.com');
  });

  it('Should not login with incorrect crendecials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'maria@example.com',
        password: 'wrongpassword'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });
});
