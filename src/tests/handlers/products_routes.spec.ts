import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Products handlers routes work properly', (): void => {
  it('should GET /products to show all products', async (): Promise<void> => {
    request
      .get('/products')
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
    request.get('/products/1').expect('Content-Type', /json/).expect(200);
  });

  it('should GET /products/:id to show a 404 if a specific product does not exist', () => {
    request.get('/products/99999999999999999999').expect(404);
    request.get('/products/hfjdshf8').expect(404);
  });

  it('should POST /products to create a new product', () => {
    request
      .post('/products')
      .send({
        name: 'aekhatean',
        first_name: 25
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => expect(response.body).toEqual(jasmine.any(String)));
  });
  it('Should validate request body', () => {
    request
      .post('/products')
      .send({
        name: 123213
      })
      .expect(422);
  });
});
