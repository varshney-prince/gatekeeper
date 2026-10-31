import winston from 'winston';
import path from 'path';

const { combine, timestamp, json, errors, printf, colorize } = winston.format;

const isDevelopment = process.env.NODE_ENV !== 'production';

const consoleFormat = printf(({ level, message, timestamp: ts, ...metadata }) => {
  let msg = `${ts} [${level}]: ${message}`;
  if (Object.keys(metadata).length > 0) {
    msg += ` ${JSON.stringify(metadata)}`;
  }
  return msg;
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  defaultMeta: { service: 'smart-gateway-service' },
  format: combine(timestamp(), errors({ stack: true })),
  transports: [
    new winston.transports.File({
      filename: path.join('logs', 'error.log'),
      level: 'error',
      format: json(),
    }),
    new winston.transports.File({
      filename: path.join('logs', 'combined.log'),
      format: json(),
    }),
  ],
});

if (isDevelopment) {
  logger.add(
    new winston.transports.Console({
      format: combine(colorize(), timestamp(), consoleFormat),
    })
  );
}

export default logger;
