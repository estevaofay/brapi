import { drizzle } from 'drizzle-orm/node-postgres';
import ServerlessClient from 'serverless-postgres';
import * as schema from './schemas/schema';

export const serverlessClient = new ServerlessClient({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  debug: process.env.NODE_ENV === 'development',
  delayMs: 3000,
  maxConnections: 1000,
});

export const db = drizzle(serverlessClient, {
  schema: schema,
  logger: process.env.NODE_ENV === 'development',
});
