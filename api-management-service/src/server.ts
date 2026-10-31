import app from './app';
import config from './config';
import logger from './config/logger';
import { SERVICE_NAME } from './config/constants';

const startServer = (): void => {
  app.listen(config.port, () => {
    logger.info(`${SERVICE_NAME} is running on port ${config.port}`);
  });
};

startServer();
