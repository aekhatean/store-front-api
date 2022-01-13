import express, { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { Order, OrderProduct, Orders } from '../models/orders.model';

const store = new Orders();

const show = async (_req: Request, res: Response) => {
  const product = await store.show(_req.body.id);
  res.json(product);
};

const create = async (_req: Request, res: Response) => {
  const order: Order = {
    userId: _req.body.userId,
    status: _req.body.status
  };

  try {
    const newOrder = await store.create(order);
    const token = jwt.sign(
      { product: newOrder },
      process.env.TOKEN_SECRET as unknown as Secret
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(order);
  }
};

const addProduct = async (_req: Request, res: Response) => {
  const orderProduct: OrderProduct = {
    orderId: _req.body.order_id,
    productId: _req.body.product_id,
    quantity: _req.body.quantity
  };

  try {
    const newOrderProduct = await store.addProduct(orderProduct);
    const token = jwt.sign(
      { product: newOrderProduct },
      process.env.TOKEN_SECRET as unknown as Secret
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(orderProduct);
  }
};

const products_routes = (app: express.Application) => {
  app.post('/orders', create);
  app.post('/orders/:id', addProduct);
  app.get('/orders/:id', show);
};

export default products_routes;
