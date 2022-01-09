import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app: express.Application = express();
const address = 'http://127.0.0.1:3000';

app.use(bodyParser.json());

app.get('/', function (_req: Request, res: Response) {
  res.send('Hello world!');
});

app.listen(3000, () => {
  console.log(`starting app on: ${address}`);
});
