import { InferModel } from 'drizzle-orm';
import { pgTable, serial, varchar, real, unique } from 'drizzle-orm/pg-core';

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
export type INewHistoricalData = InferModel<typeof historicalData, 'insert'>;
