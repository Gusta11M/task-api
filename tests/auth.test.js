const request = require('supertest');
const app = require('../server'); // exporta o `app` no server.js

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
