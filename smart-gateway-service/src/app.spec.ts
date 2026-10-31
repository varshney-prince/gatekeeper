import request from 'supertest';
import app from './app';
import { ROUTES, SERVICE_NAME } from './config/constants';

describe('Smart Gateway Service', () => {
  it('should respond on the root route', async () => {
    const response = await request(app).get(ROUTES.root);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Smart Gateway Service is running',
    });
  });

  it('should respond on the health route', async () => {
    const response = await request(app).get(ROUTES.health);

    expect(response.status).toBe(200);
    expect(response.body.service).toBe(SERVICE_NAME);
    expect(response.body.status).toBe('UP');
    expect(response.body.timestamp).toBeDefined();
  });
});
