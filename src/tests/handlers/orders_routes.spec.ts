import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('orders handlers routes work properly', (): void => {
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
      .send({
        userId: 1,
        status: 'open'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => expect(response.body).toEqual(jasmine.any(String)));
  });

  it('should POST /orders/:id to create add a new product to an order', () => {
    request
      .post('/orders/')
      .send({
        orderId: 1,
        productId: 1,
        quantity: 1
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => expect(response.body).toEqual(jasmine.any(String)));
  });

  it('Should validate request body', () => {
    request
      .post('/orders')
      .send({
        name: 123213
      })
      .expect(422);
  });
});
