import axios from 'axios';
import { getDBQuote } from '~/db/queries/getDBQuote';
import { ITicker } from '~/db/schemas/schema';

type IYahooFinanceQuoteResponse = {
  optionChain: {
    result: {
      quote: IYahooFinanceQuote;
    }[];
  };
};

export interface IYahooFinanceQuote {
  language: string;
  region: string;
  quoteType: string;
  typeDisp: string;
  quoteSourceName: string;
  triggerable: boolean;
  customPriceAlertConfidence: string;
  currency: string;
  marketState: string;
  exchange: string;
  regularMarketChangePercent: number;
  regularMarketPrice: number;
  regularMarketPreviousClose: number;
  ask: number;
  bidSize: number;
  askSize: number;
  fullExchangeName: string;
  financialCurrency: string;
  regularMarketOpen: number;
  averageDailyVolume3Month: number;
  averageDailyVolume10Day: number;
  fiftyTwoWeekLowChange: number;
  fiftyTwoWeekLowChangePercent: number;
  fiftyTwoWeekRange: string;
  fiftyTwoWeekHighChange: number;
  fiftyTwoWeekHighChangePercent: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekChangePercent: number;
  earningsTimestamp: number;
  earningsTimestampStart: number;
  earningsTimestampEnd: number;
  trailingAnnualDividendRate: number;
  trailingPE: number;
  dividendRate: number;
  trailingAnnualDividendYield: number;
  dividendYield: number;
  epsTrailingTwelveMonths: number;
  epsForward: number;
  epsCurrentYear: number;
  priceEpsCurrentYear: number;
  sharesOutstanding: number;
  bookValue: number;
  fiftyDayAverage: number;
  fiftyDayAverageChange: number;
  fiftyDayAverageChangePercent: number;
  twoHundredDayAverage: number;
  twoHundredDayAverageChange: number;
  twoHundredDayAverageChangePercent: number;
  marketCap: number;
  forwardPE: number;
  priceToBook: number;
  sourceInterval: number;
  exchangeDataDelayedBy: number;
  averageAnalystRating: string;
  tradeable: boolean;
  cryptoTradeable: boolean;
  firstTradeDateMilliseconds: number;
  priceHint: number;
  regularMarketChange: number;
  regularMarketTime: number;
  regularMarketDayHigh: number;
  regularMarketDayRange: string;
  regularMarketDayLow: number;
  regularMarketVolume: number;
  bid: number;
  shortName: string;
  longName: string;
  messageBoardId: string;
  exchangeTimezoneName: string;
  exchangeTimezoneShortName: string;
  gmtOffSetMilliseconds: number;
  market: string;
  esgPopulated: boolean;
  symbol: string;
}

export type IGetQuoteInformationResponse = ITicker | IYahooFinanceQuote;

interface IGetQuoteInformation {
  parsedSlug: string;
  slug: string;
}

export const getQuoteInformation = async ({
  parsedSlug,
  slug,
}: IGetQuoteInformation): Promise<IGetQuoteInformationResponse> => {
  const ticker = await getDBQuote({ slug });

  if (ticker?.ticker) {
    return ticker.ticker;
  }

  const response = await axios.get<IYahooFinanceQuoteResponse>(
    `https://query1.finance.yahoo.com/v7/finance/options/${parsedSlug}`,
  );

  return response?.data?.optionChain?.result?.[0]?.quote;
};
