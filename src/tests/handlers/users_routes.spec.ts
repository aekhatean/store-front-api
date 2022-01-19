import supertest from 'supertest';
import dotenv from 'dotenv';
import app from '../../server';

dotenv.config();

const request = supertest(app);
let REQ_TOKEN: string;

describe('Users handlers routes work properly', (): void => {
  beforeAll(async () => {
    const req = request.post('/users').send({
      first_name: 'Adham',
      last_name: 'Khatean',
      password: '1234'
    });
    REQ_TOKEN = (await req).text.replace(/['"]+/g, '');
  });

  it('should GET /users to show all users', async (): Promise<void> => {
    console.log(REQ_TOKEN);
    request
      .get('/users')
      .set({ token: REQ_TOKEN })
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
    request
      .get('/users/1')
      .set({ token: REQ_TOKEN })
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('should GET /users/:id to show a 404 if a specific user does not exist', () => {
    request
      .get('/users/99999999999999999999')
      .set({ token: REQ_TOKEN })
      .expect(404);
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
