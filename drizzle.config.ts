import dotenv from 'dotenv';
dotenv.config({
  path: '.env.local',
});

import type { Config } from 'drizzle-kit';

export default {
  out: './db/migrations',
  schema: './db/schemas/index.ts',
  driver: 'pg',
  dbCredentials: {
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT) || 5432,
  },
} as Config;
