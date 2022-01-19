import supertest from 'supertest';
import dotenv from 'dotenv';
import app from '../../server';

dotenv.config();

const request = supertest(app);
let REQ_TOKEN: string;

describe('Products handlers routes work properly', (): void => {
  beforeAll(async () => {
    const req = request.post('/users').send({
      first_name: 'maged',
      last_name: 'hady',
      password: '1234'
    });
    REQ_TOKEN = (await req).text.replace(/['"]+/g, '');
  });

  it('should GET /products to show all products', async (): Promise<void> => {
    request
      .get('/products')
      .set({ token: REQ_TOKEN })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          jasmine.arrayContaining([
            jasmine.objectContaining({
              id: jasmine.any(Number),
              name: jasmine.any(String),
              price: jasmine.any(Number)
            })
          ])
        );
      });
  });

  it('should GET /products/:id to show a specific product', async (): Promise<void> => {
    request
      .get('/products/1')
      .set({ token: REQ_TOKEN })
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('should GET /products/:id to show a 404 if a specific product does not exist', () => {
    request
      .get('/products/99999999999999999999')
      .set({ token: REQ_TOKEN })
      .expect(404);
    request.get('/products/hfjdshf8').set({ token: REQ_TOKEN }).expect(404);
  });

  it('should POST /products to create a new product', () => {
    request
      .post('/products')
      .set({ token: REQ_TOKEN })
      .send({
        name: 'back pack',
        price: 25
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) =>
        expect(response.body).toEqual(
          jasmine.objectContaining({
            id: jasmine.any(Number),
            name: jasmine.any(String),
            price: jasmine.any(Number)
          })
        )
      );
  });
  it('Should validate request body', () => {
    request
      .post('/products')
      .set({ token: REQ_TOKEN })
      .send({
        name: 123213
      })
      .expect(422);
  });
});
