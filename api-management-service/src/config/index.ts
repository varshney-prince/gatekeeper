import dotenv from 'dotenv';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3001,
  logLevel: process.env.LOG_LEVEL || 'info',
};

export default config;
