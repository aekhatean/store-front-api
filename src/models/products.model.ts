import Client from '../database';

export type Product = {
  name: string;
  price: number;
};

export class Products {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = conn.query(sql);
      conn.release();
      return (await result).rows;
    } catch (err) {
      throw new Error(`Cannot connect to database: ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM products WHERE id=($1)`;
      const result = conn.query(sql, [id]);
      conn.release();
      return (await result).rows[0];
    } catch (err) {
      throw new Error(`Cannot connect to database: ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [p.name, p.price]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
    }
  }
}
