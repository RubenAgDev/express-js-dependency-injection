import express, { Express, Request, Response } from 'express';

import { database } from './dependencies';
import Settings from './settings';

const morgan = require('morgan');

const LOG_PREFIX = '⚡️[server]:';

const app: Express = express();

app.use(morgan(Settings.LOGGING_FORMAT));

app.get('/health', (req: Request, res: Response) => {
  res.send('ok');
});

const server = app.listen(Settings.PORT, async () => {
  if (!Settings.DB_CONNECTION_STRING) {
    throw new Error(`${LOG_PREFIX} DB connection string is missing`);
  }
  try {
    await database.connect(Settings.DB_CONNECTION_STRING, Settings.DB_NAME, Settings.APP_NAME);
    console.log(`${LOG_PREFIX} Connected to DB`);
  } catch(err) {
    console.dir(err);
  }
  console.log(`${LOG_PREFIX} Server is running at https://localhost:${Settings.PORT}`);
});

process.on('SIGTERM', async () => {
  console.info(`${LOG_PREFIX} SIGTERM signal received.`);
  await server.close();
  console.log(`${LOG_PREFIX} Server closed.`);
  await database.close();
  console.log(`${LOG_PREFIX} DB connection closed.`);
  process.exit(0);
});
