import { IYahooFinanceQuote } from '~/services/getQuoteInformation';

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

export const parseDefaultQuoteData = ({
  data,
  slug,
  customFields,
}: IParseDefaultQuoteData) => {
  const { symbol, regularMarketTime, ...rest } = data;

  const allFields = [...defaultFields, ...(customFields ?? [])];

  const necessaryFields = allFields.reduce((acc, field) => {
    acc[field] = rest[field];

    return acc;
  }, {} as typeof rest);

  return {
    ...necessaryFields,
    symbol: slug.toString().toUpperCase(),
    regularMarketTime: new Date(data.regularMarketTime * 1000),
  };
};
