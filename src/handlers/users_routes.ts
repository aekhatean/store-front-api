import express, { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { User, Users } from '../models/users.model';
const store = new Users();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
  }
};

const show = async (_req: Request, res: Response) => {
  try {
    const user = await store.show(parseInt(_req.params.id));
    res.json(user);
  } catch (err) {
    res.status(400);
  }
};

const create = async (_req: Request, res: Response) => {
  const user: User = {
    first_name: _req.body.first_name,
    last_name: _req.body.last_name,
    password: _req.body.password
  };

  try {
    const newUser = await store.create(user);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as unknown as Secret
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(user);
  }
};

const users_routes = (app: express.Application) => {
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users', create);
};

export default users_routes;
