import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersController from './controllers/usersController';

dotenv.config();

// const port = process.env.API_PORT;

class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static('public'));
    this.app.use(express.json());
    this.app.use(cors());
  }

  public init = async () => {
    try {
      this.app.listen(process.env.PORT, () => {
        console.log(`server is started on port ${process.env.PORT}`);
      });
      this.app.use('/users', usersController);
    } catch (error) {
      const err = error as Error;
      console.log(err.message);
    }
  };
}

export const app = new App();

app
  .init()
  .then(() => {
    console.log('Server is ok');
  })
  .catch(() => {
    console.log('server is not ok');
  });
