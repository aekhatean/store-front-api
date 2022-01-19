import Client from '../database';

export type Order = {
  id?: number;
  userId: number;
  status: string;
};

export type OrderProduct = {
  orderId: number;
  productId: number;
  quantity: number;
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

  async addProduct(
    quantity: number,
    orderId: number,
    productId: number
  ): Promise<Order> {
    // get order to see if it is open
    try {
      const ordersql = 'SELECT * FROM orders WHERE id=($1)';
      const conn = await Client.connect();

      const result = await conn.query(ordersql, [orderId]);

      const order = result.rows[0];

      if (order.status !== 'open') {
        throw new Error(
          `Could not add product ${productId} to order ${orderId} because order status is ${order.status}`
        );
      }

      conn.release();
    } catch (err) {
      throw new Error(`${err}`);
    }

    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
}
