// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export interface QuoteProps {
  currency: string;
  fiftyDayAverage: number;
  fiftyDayAverageChange: number;
  fiftyDayAverageChangePercent: number;
  twoHundredDayAverage: number;
  twoHundredDayAverageChange: number;
  twoHundredDayAverageChangePercent: number;
  marketCap: number;
  shortName: string;
  longName: string;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketTime: number;
  regularMarketPrice: number;
  regularMarketDayHigh: number;
  regularMarketDayRange: string;
  regularMarketDayLow: number;
  regularMarketVolume: number;
  regularMarketPreviousClose: number;
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
  symbol: string;
}

import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;

  try {
    const response = await axios.get(
      `https://query1.finance.yahoo.com/v7/finance/options/${slug}.SA`,
    );

    const data: QuoteProps = response.data.optionChain.result[0].quote;

    const quote = {
      symbol: slug.toString().toUpperCase(),
      shortName: data.shortName,
      longName: data.longName,
      currency: data.currency,
      regularMarketPrice: data.regularMarketPrice,
      regularMarketDayHigh: data.regularMarketDayHigh,
      regularMarketDayLow: data.regularMarketDayLow,
      regularMarketDayRange: data.regularMarketDayRange,
      regularMarketChange: data.regularMarketChange,
      regularMarketChangePercent: data.regularMarketChangePercent,
      regularMarketTime: new Date(data.regularMarketTime * 1000).toTimeString(),
      marketCap: data.marketCap,
      regularMarketVolume: data.regularMarketVolume,
      regularMarketPreviousClose: data.regularMarketPreviousClose,
      regularMarketOpen: data.regularMarketOpen,
      averageDailyVolume10Day: data.averageDailyVolume10Day,
      averageDailyVolume3Month: data.averageDailyVolume3Month,
      fiftyTwoWeekLowChange: data.fiftyTwoWeekLowChange,
      fiftyTwoWeekLowChangePercent: data.fiftyTwoWeekLowChangePercent,
      fiftyTwoWeekRange: data.fiftyTwoWeekRange,
      fiftyTwoWeekHighChange: data.fiftyTwoWeekHighChange,
      fiftyTwoWeekHighChangePercent: data.fiftyTwoWeekHighChangePercent,
      fiftyTwoWeekLow: data.fiftyTwoWeekLow,
      fiftyTwoWeekHigh: data.fiftyTwoWeekHigh,
      twoHundredDayAverage: data.twoHundredDayAverage,
      twoHundredDayAverageChange: data.twoHundredDayAverageChange,
      twoHundredDayAverageChangePercent: data.twoHundredDayAverageChangePercent,
    };

    const dynamicDate = new Date().toTimeString();

    res.status(200).json({
      results: quote,
      updatedAt: dynamicDate,
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
