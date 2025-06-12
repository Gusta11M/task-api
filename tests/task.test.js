const request = require('supertest');
const app = require('../server');

let token;
let taskId;

beforeAll(async () => {
    const res = await request(app)
        .post('/api/auth/register')
        .send({
        name: 'Test User',
        email: 'tasktester@example.com',
        password: 'testpassword'
    });
    token = res.body.token;
});

describe('Task API', () => {
    
    it('Should create a new task', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .set('x-auth-token', `Bearer ${token}`)
            .send({
                title: 'Test Task',
                description: 'This is a test task'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.task).toHaveProperty('title', 'Test Task');

    // Save the task ID for later tests
    taskId = res.body.task._id;
    });

    it('Should get all tasks', async () => {
        const res = await request(app)
            .get('/api/tasks')
            .set('x-auth-token', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('tasks');
        expect(Array.isArray(res.body.tasks)).toBe(true);
    });

    it('Should update a task', async () => {
        const createRes = await request(app)
            .post('/api/tasks')
            .set('x-auth-token', `Bearer ${token}`)
            .send({
                title: 'Task to Update',
                description: 'This task will be updated'
            });

        const updateRes = await request(app)
            .put(`/api/tasks/${taskId}`)
            .set('x-auth-token', `Bearer ${token}`)
            .send({
                title: 'Updated Task',
                description: 'This task has been updated',
                completed: true
            });

        expect(updateRes.statusCode).toBe(200);
        expect(updateRes.body).toHaveProperty('task');
        expect(updateRes.body.task.title).toBe('Updated Task');
    });

    it('Should delete a task', async () => {
        const createRes = await request(app)
            .post('/api/tasks')
            .set('x-auth-token', `Bearer ${token}`)
            .send({
                title: 'Task to Delete',
                description: 'This task will be deleted'
            });

        const deleteRes = await request(app)
            .delete(`/api/tasks/${taskId}`)
            .set('x-auth-token', `Bearer ${token}`);

        expect(deleteRes.statusCode).toBe(200);
        expect(deleteRes.body).toHaveProperty('message', 'Task deleted successfully');
    });

    it('Should not allow view the tasks without token', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Invalid', description: 'Without token' });

    expect(res.statusCode).toBe(401);
  });
});