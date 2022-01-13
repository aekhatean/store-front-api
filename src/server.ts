import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

// Import endpoint handlers
import users_routes from './handlers/users_routes';
import products_routes from './handlers/products_routes';
import orders_routes from './handlers/orders_routes';

const app: express.Application = express();
const port = 3000;
const address = `http://127.0.0.1:${port}`;

app.use(bodyParser.json());

app.get('/', function (_req: Request, res: Response) {
  res.send('Hello world!');
});

users_routes(app);
products_routes(app);
orders_routes(app);

app.listen(port, () => {
  console.log(`starting app on: ${address}`);
});

export default app;
