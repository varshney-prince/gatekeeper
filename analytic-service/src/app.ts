import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ROUTES, SERVICE_NAME } from './config/constants';
import globalErrorHandler from './common/middlewares/globalErrorHandler';

export const createApp = (): Application => {
  const app: Application = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get(ROUTES.health, (_req: Request, res: Response) => {
    res.status(200).json({
      service: SERVICE_NAME,
      status: 'UP',
      timestamp: new Date().toISOString(),
    });
  });

  app.get(ROUTES.root, (_req: Request, res: Response) => {
    res.status(200).json({
      message: 'Analytics Service is running',
    });
  });

  app.use(globalErrorHandler);

  return app;
};

const app = createApp();
export default app;
