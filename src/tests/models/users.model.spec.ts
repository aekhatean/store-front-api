import { Users, User } from '../../models/users.model';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS, TEST_PASSWORD } = process.env;

describe('Users model', () => {
  const store = new Users();

  it('should return a User object on create User', async (): Promise<void> => {
    const hash = bcrypt.hashSync(
      (TEST_PASSWORD as unknown as string) +
        (BCRYPT_PASSWORD as unknown as string),
      parseInt(SALT_ROUNDS as unknown as string)
    );
    const user: User = {
      first_name: 'Adham',
      last_name: 'Khatean',
      password: hash
    };

    expect(await store.create(user)).toEqual(
      jasmine.objectContaining({
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
          first_name: jasmine.any(String),
          last_name: jasmine.any(String),
          password: jasmine.any(String)
        })
      ])
    );
  });

  it('should return a User object on show User', async (): Promise<void> => {
    const hash = bcrypt.hashSync(
      (TEST_PASSWORD as unknown as string) +
        (BCRYPT_PASSWORD as unknown as string),
      parseInt(SALT_ROUNDS as unknown as string)
    );
    const user: User = {
      first_name: 'Adham',
      last_name: 'Khatean',
      password: hash
    };

    await store.create(user).then(async (producedUser) =>
      expect(await store.show(producedUser.id as unknown as number)).toEqual(
        jasmine.objectContaining({
          first_name: jasmine.any(String),
          last_name: jasmine.any(String),
          password: jasmine.any(String)
        })
      )
    );
  });
});
