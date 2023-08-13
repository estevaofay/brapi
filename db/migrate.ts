import dotenv from 'dotenv';
dotenv.config({
  path: '.env.local',
});

import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT) || 5432,
});

const db = drizzle(pool);
const run = async () => {
  console.log(`[${process.env.POSTGRES_HOST}] Running migrations...`);

  await migrate(db, { migrationsFolder: './db/migrations' });

  console.log(`[${process.env.POSTGRES_HOST}] Migrations complete!`);
};

run();
