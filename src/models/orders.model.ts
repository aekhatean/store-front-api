import Client from '../database';

export type Order = {
  userId: number;
  status: string;
};

export type OrderProduct = {
  orderId: number;
  productId: number;
  quantity: string;
};
export class Orders {
  async show(id: number): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM orders WHERE id=($1)`;
      const result = conn.query(sql, [id]);
      conn.release();
      return (await result).rows[0];
    } catch (err) {
      throw new Error(`Cannot connect to database: ${err}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const createOrderSQL =
        'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(createOrderSQL, [o.userId, o.status]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not create order: ${err}`);
    }
  }

  async addProduct(op: OrderProduct): Promise<Order> {
    try {
      const sql =
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        op.orderId,
        op.productId,
        op.quantity
      ]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add product to your order: ${err}`);
    }
  }
}
