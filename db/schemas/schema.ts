import {
  pgTable,
  serial,
  varchar,
  real,
  timestamp,
  unique,
} from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';

export const historicalData = pgTable(
  'historical_data',
  {
    id: serial('id').primaryKey(),
    symbol: varchar('symbol').notNull(),
    date: real('date').notNull(),
    open: real('open'),
    high: real('high'),
    low: real('low'),
    close: real('close'),
    volume: real('volume'),
    adjustedClose: real('adjustedClose'),
  },
  (t) => ({
    unique: unique().on(t.symbol, t.date),
  }),
);

export type IHistoricalData = InferModel<typeof historicalData, 'select'>;
export type IHistoricalDataInsert = InferModel<typeof historicalData, 'insert'>;
