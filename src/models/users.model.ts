import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import Client from '../database';

export type User = {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
};

dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export class Users {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users;';
      const result = conn.query(sql);
      conn.release();
      return (await result).rows;
    } catch (err) {
      throw new Error(`Cannot connect to database: ${err}`);
    }
  }

  async show(id: number): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM users WHERE id=($1)`;
      const result = conn.query(sql, [id]);
      conn.release();
      return (await result).rows;
    } catch (err) {
      throw new Error(`Cannot connect to database: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    const hash = bcrypt.hashSync(
      u.password + BCRYPT_PASSWORD,
      parseInt(SALT_ROUNDS as unknown as string)
    );
    try {
      const sql =
        'INSERT INTO users (first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        u.first_name,
        u.last_name,
        u.username,
        hash
      ]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not add new book ${u.username}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = `DELETE FROM users WHERE id=($1)`;
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Cannot connect to database: ${err}`);
    }
  }

  async authenticate(
    username: string,
    password: string
  ): Promise<User | undefined> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT password FROM users WHERE name=($1)`;
      const result = await conn.query(sql, [username]);

      if (result.rows.length) {
        const user: User = result.rows[0];

        if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
          return user;
        }

        return undefined;
      }
    } catch (err) {
      throw new Error(`Cannot connect to database: ${err}`);
    }
  }
}
