import express, { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { Order, OrderProduct, Orders } from '../models/orders.model';

const store = new Orders();

const show = async (_req: Request, res: Response): Promise<void> => {
  try {
    const product = await store.show(parseInt(_req.params.id));
    res.json(product);
  } catch (err) {
    res.status(400);
  }
};

const create = async (_req: Request, res: Response): Promise<void> => {
  const order: Order = {
    userId: _req.body.userId,
    status: _req.body.status
  };

  try {
    const newOrder = await store.create(order);
    jwt.verify(
      _req.headers.token as unknown as string,
      process.env.TOKEN_SECRET as unknown as Secret,
      (err, decode) => {
        if (err) {
          console.log(err);
        } else {
          console.log(decode);
          res.json(newOrder);
        }
      }
    );
  } catch (err) {
    res.status(400);
    res.json(order);
  }
};

const addProduct = async (_req: Request, res: Response): Promise<void> => {
  const orderProduct: OrderProduct = {
    orderId: _req.body.order_id,
    productId: _req.body.product_id,
    quantity: _req.body.quantity
  };

  try {
    const newOrderProduct = await store.addProduct(
      orderProduct.quantity,
      orderProduct.orderId,
      orderProduct.productId
    );
    jwt.verify(
      _req.headers.token as unknown as string,
      process.env.TOKEN_SECRET as unknown as Secret,
      (err, decode) => {
        if (err) {
          console.log(err);
        } else {
          console.log(decode);
          res.json(newOrderProduct);
        }
      }
    );
  } catch (err) {
    res.status(400);
    res.json(orderProduct);
  }
};

const orders_routes = (app: express.Application): void => {
  app.post('/orders', create);
  app.post('/orders/:id', addProduct);
  app.get('/orders/:id', show);
};

export default orders_routes;
