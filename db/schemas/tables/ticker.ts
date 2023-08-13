import { pgTable, varchar, real, timestamp } from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';

export const tickers = pgTable('Tickers', {
  symbol: varchar('symbol').primaryKey(),
  currency: varchar('currency'),
  twoHundredDayAverage: real('twoHundredDayAverage'),
  twoHundredDayAverageChange: real('twoHundredDayAverageChange'),
  twoHundredDayAverageChangePercent: real('twoHundredDayAverageChangePercent'),
  marketCap: real('marketCap'),
  shortName: varchar('shortName'),
  longName: varchar('longName'),
  regularMarketChange: real('regularMarketChange'),
  regularMarketChangePercent: real('regularMarketChangePercent'),
  regularMarketTime: timestamp('regularMarketTime', {
    withTimezone: true,
    mode: 'string',
  }),
  regularMarketPrice: real('regularMarketPrice'),
  regularMarketDayHigh: real('regularMarketDayHigh'),
  regularMarketDayRange: varchar('regularMarketDayRange'),
  regularMarketDayLow: real('regularMarketDayLow'),
  regularMarketVolume: real('regularMarketVolume'),
  regularMarketPreviousClose: real('regularMarketPreviousClose'),
  regularMarketOpen: real('regularMarketOpen'),
  averageDailyVolume3Month: real('averageDailyVolume3Month'),
  averageDailyVolume10Day: real('averageDailyVolume10Day'),
  fiftyTwoWeekLowChange: real('fiftyTwoWeekLowChange'),
  fiftyTwoWeekLowChangePercent: real('fiftyTwoWeekLowChangePercent'),
  fiftyTwoWeekRange: varchar('fiftyTwoWeekRange'),
  fiftyTwoWeekHighChange: real('fiftyTwoWeekHighChange'),
  fiftyTwoWeekHighChangePercent: real('fiftyTwoWeekHighChangePercent'),
  fiftyTwoWeekLow: real('fiftyTwoWeekLow'),
  fiftyTwoWeekHigh: real('fiftyTwoWeekHigh'),
  priceEarnings: real('priceEarnings'),
  earningsPerShare: real('earningsPerShare'),
  logourl: varchar('logourl'),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).defaultNow(),
});

export type ITicker = InferModel<typeof tickers, 'select'>;
export type INewTicker = InferModel<typeof tickers, 'insert'>;
