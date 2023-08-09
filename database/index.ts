import ServerlessClient from 'serverless-postgres';

export const dbClient = new ServerlessClient({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
  debug: true,
  delayMs: 3000,
});
