import { ITicker } from '~/database/schemas/schema';
import {
  IGetQuoteInformationResponse,
  IYahooFinanceQuote,
} from '~/services/getQuoteInformation';

export const defaultFields = [
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
type IDefaultFields = Pick<IYahooFinanceQuote, typeof defaultFields[number]>;

interface IParseDefaultQuoteData {
  data: IGetQuoteInformationResponse;
  slug: string;
  customFields?: ICustomFields[];
}

export const parseDefaultQuoteData = async ({
  data,
  slug,
  customFields,
}: IParseDefaultQuoteData) => {
  if (data.hasOwnProperty('updatedAt')) {
    return data as ITicker;
  }

  const { symbol, regularMarketTime, ...rest } =
    (data as IYahooFinanceQuote) ?? {};

  const allFields = [...defaultFields, ...(customFields ?? [])];

  const necessaryFields = allFields.reduce((acc, field) => {
    acc[field] = rest[field];

    return acc;
    // todo: merge type with customFields if customFields is not undefined
  }, {} as IDefaultFields);

  const parsedQuoteData = {
    ...necessaryFields,
    symbol: slug.toString().toUpperCase(),
    regularMarketTime: new Date(regularMarketTime * 1000).toISOString(),
  };

  return parsedQuoteData;
};
