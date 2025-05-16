const request = require('supertest');
const app = require('../server'); // ensure export from server.js

describe('Workout Routes', () => {
  it('should get workouts', async () => {
    const res = await request(app).get('/api/workouts');
    expect(res.statusCode).toBe(401); // Unauthorized without token
  });
});