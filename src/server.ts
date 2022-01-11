import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

// Import endpoint handlers
import users_routes from './handlers/users_routes';
import products_routes from './handlers/products_routes';

const app: express.Application = express();
const address = 'http://127.0.0.1:3000';

app.use(bodyParser.json());

app.get('/', function (_req: Request, res: Response) {
  res.send('Hello world!');
});

users_routes(app);
products_routes(app);

app.listen(3000, () => {
  console.log(`starting app on: ${address}`);
});
