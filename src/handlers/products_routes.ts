import express, { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { Product, Products } from '../models/products.model';
const store = new Products();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400);
  }
};

const show = async (_req: Request, res: Response) => {
  try {
    const product = await store.show(parseInt(_req.body.id));
    res.json(product);
  } catch (err) {
    res.status(400);
  }
};

const create = async (_req: Request, res: Response) => {
  const product: Product = {
    name: _req.body.name,
    price: _req.body.price
  };

  try {
    const newProduct = await store.create(product);
    const token = jwt.sign(
      { product: newProduct },
      process.env.TOKEN_SECRET as unknown as Secret
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(product);
  }
};

const products_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', create);
};

export default products_routes;
