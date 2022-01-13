import { Users, User } from '../../models/users.model';

describe('Usera model', () => {
  const store = new Users();

  it('should return a Product object on create User', async (): Promise<void> => {
    const user: User = {
      username: 'ddd',
      first_name: 'Adham',
      last_name: 'Khatean',
      password: '1234'
    };

    expect(await store.create(user)).toEqual(
      jasmine.objectContaining({
        username: jasmine.any(String),
        first_name: jasmine.any(String),
        last_name: jasmine.any(String),
        password: jasmine.any(String)
      })
    );
  });

  it('should return an array of User objects on index User', async (): Promise<void> => {
    expect(await store.index()).toEqual(
      jasmine.arrayContaining([
        jasmine.objectContaining({
          username: jasmine.any(String),
          first_name: jasmine.any(String),
          last_name: jasmine.any(String),
          password: jasmine.any(String)
        })
      ])
    );
  });
});
