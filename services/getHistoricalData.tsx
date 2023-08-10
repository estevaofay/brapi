import axios from 'axios';

interface IYahooFinanceResponse {
  chart: {
    result: {
      timestamp: number[];
      indicators: {
        quote: {
          low: number[];
          high: number[];
          open: number[];
          close: number[];
          volume: number[];
        }[];
        adjclose: {
          adjclose: number[];
        }[];
      };
    }[];
  };
}

interface IGetHistoricalData {
  parsedSlug: string;
  interval?: string;
  range?: string;
}

export interface IGetHistoricalDataResponse {
  date: number;
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  volume: number | null;
  adjustedClose: number | null;
}

export const getHistoricalData = async ({
  parsedSlug,
  interval,
  range,
}: IGetHistoricalData): Promise<IGetHistoricalDataResponse[]> => {
  const historicalResponse = await axios.get<IYahooFinanceResponse>(
    `https://query1.finance.yahoo.com/v8/finance/chart/${parsedSlug}${
      interval && range
        ? `?includePrePost=false&interval=${interval}&useYfid=true&range=${range}`
        : '?includePrePost=false&interval=1d&useYfid=true&range=1mo'
    }`,
  );

  const result = historicalResponse.data.chart.result?.[0];

  const { timestamp, indicators } = result || {};
  const { quote, adjclose } = indicators || {};
  const { low, high, open, close, volume } = quote[0];

  const { adjclose: adjustedClose } = adjclose?.[0] || {};

  const prices = timestamp?.map((date, index) => ({
    date,
    open: open?.[index] ?? null,
    high: high?.[index] ?? null,
    low: low?.[index] ?? null,
    close: close?.[index] ?? null,
    volume: volume?.[index] ?? null,
    adjustedClose: adjustedClose?.[index] ?? null,
  }));

  return prices ?? [];
};
