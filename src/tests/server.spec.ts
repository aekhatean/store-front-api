import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Store-front API routes', async (): Promise<void> => {
  it('Should responsed with instructions to the user', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
