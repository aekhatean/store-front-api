import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Users handlers routes work properly', (): void => {
  it('should GET /users to show all users', async (): Promise<void> => {
    request
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          jasmine.arrayContaining([
            jasmine.objectContaining({
              id: jasmine.any(Number),
              first_name: jasmine.any(String),
              last_name: jasmine.any(String),
              password: jasmine.any(String)
            })
          ])
        );
      });
  });

  it('should GET /users/:id to show a specific user', async (): Promise<void> => {
    request.get('/users/1').expect('Content-Type', /json/).expect(200);
  });

  it('should GET /users/:id to show a 404 if a specific user does not exist', () => {
    request.get('/users/99999999999999999999').expect(404);
    request.get('/users/hfjdshf8').expect(404);
  });

  it('should POST /users to create a new user', () => {
    request
      .post('/users')
      .send({
        first_name: 'Adham',
        last_name: 'Khatean',
        password: '1234'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => expect(response.body).toEqual(jasmine.any(String)));
  });
  it('Should validate request body', () => {
    request
      .post('/users')
      .send({
        first_name: 123213
      })
      .expect(422);
  });
});
