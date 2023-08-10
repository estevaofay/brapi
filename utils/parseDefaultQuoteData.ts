import { IYahooFinanceQuote } from '~/services/getQuoteInformation';
import { db, serverlessClient } from '~/database';
import { ITicker, tickers } from '~/database/schemas/schema';

const defaultFields = [
  'currency',
  'twoHundredDayAverage',
  'twoHundredDayAverageChange',
  'twoHundredDayAverageChangePercent',
  'marketCap',
  'shortName',
  'longName',
  'regularMarketChange',
  'regularMarketChangePercent',
  'regularMarketTime',
  'regularMarketPrice',
  'regularMarketDayHigh',
  'regularMarketDayRange',
  'regularMarketDayLow',
  'regularMarketVolume',
  'regularMarketPreviousClose',
  'regularMarketOpen',
  'averageDailyVolume3Month',
  'averageDailyVolume10Day',
  'fiftyTwoWeekLowChange',
  'fiftyTwoWeekLowChangePercent',
  'fiftyTwoWeekRange',
  'fiftyTwoWeekHighChange',
  'fiftyTwoWeekHighChangePercent',
  'fiftyTwoWeekLow',
  'fiftyTwoWeekHigh',
  'symbol',
] as const;

type ICustomFields = keyof IYahooFinanceQuote;

interface IParseDefaultQuoteData {
  data: IYahooFinanceQuote;
  slug: string;
  customFields?: ICustomFields[];
}

export const parseDefaultQuoteData = async ({
  data,
  slug,
  customFields,
}: IParseDefaultQuoteData) => {
  const { symbol, regularMarketTime, ...rest } = data ?? {};

  const allFields = [...defaultFields, ...(customFields ?? [])];

  const necessaryFields = allFields.reduce((acc, field) => {
    acc[field] = rest[field];

    return acc;
  }, {} as typeof rest);

  const parsedQuoteData = {
    ...necessaryFields,
    symbol: slug.toString().toUpperCase(),
    regularMarketTime: new Date(regularMarketTime * 1000),
  };

  const start = performance.now();
  await serverlessClient.connect();
  await db
    .insert(tickers)
    .values({
      ...((parsedQuoteData as unknown) as ITicker),
    })
    .onConflictDoUpdate({
      set: (parsedQuoteData as unknown) as ITicker,
      target: tickers.symbol,
    });

  await serverlessClient.clean();
  const end = performance.now();

  return {
    took: (end - start).toFixed(0) + 'ms',
    ...parsedQuoteData,
  };
};
