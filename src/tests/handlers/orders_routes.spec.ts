import supertest from 'supertest';
import dotenv from 'dotenv';
import app from '../../server';

dotenv.config();
const request = supertest(app);
let REQ_TOKEN: string;

describe('orders handlers routes work properly', (): void => {
  beforeAll(async () => {
    const req = request.post('/users').send({
      first_name: 'Adham',
      last_name: 'Khatean',
      password: '1234'
    });
    REQ_TOKEN = (await req).text.replace(/['"]+/g, '');
  });

  it('should GET /orders/:id to show current order', async (): Promise<void> => {
    request.get('/orders/1').expect('Content-Type', /json/).expect(200);
  });

  it('should GET /orders/:id to show a 404 if a specific user does not exist', () => {
    request.get('/orders/99999999999999999999').expect(404);
    request.get('/orders/hfjdshf8').expect(404);
  });

  it('should POST /orders to create a new order', () => {
    request
      .post('/orders')
      .set({ token: REQ_TOKEN })
      .send({
        userId: 1,
        status: 'open'
      })
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('should POST /orders/:id to create add a new product to an order', () => {
    request
      .post('/orders/')
      .set({ token: REQ_TOKEN })
      .send({
        orderId: 1,
        productId: 1,
        quantity: 1,
        token: REQ_TOKEN
      })
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('Should validate request body', () => {
    request
      .post('/orders')
      .send({
        name: 123213,
        token: REQ_TOKEN
      })
      .expect(422);
  });
});
