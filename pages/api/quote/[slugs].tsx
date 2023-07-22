import axios from 'axios';
import { logHost } from '../../../utils/logHost';
import { NextApiRequest, NextApiResponse } from 'next';
import { QuoteProps } from '../../../@types/QuoteProps';
import {
  getFundamentalInformation,
  IGetFundamentalInformationResponse,
} from '~/services/getFundamentalInformation';
import {
  getDividendsInformation,
  IGetDividendsInformationResponse,
} from '~/services/getDividendsInformation';

interface LooseObject {
  [key: string]: any;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  logHost(req, 'quote');

  const { slugs, interval, range, fundamental, dividends } = req.query;

  const validRanges = [
    '1d',
    '5d',
    '1mo',
    '3mo',
    '6mo',
    '1y',
    '2y',
    '5y',
    '10y',
    'ytd',
    'max',
  ];

  const allSlugs = slugs.toString().split(',');

  if (slugs) {
    const responseAllSlugs = async () => {
      const promises = allSlugs.map(async (slug) => {
        try {
          const isBrazilianStock = /\d/.test(slug);

          const parsedSlug = isBrazilianStock ? `${slug}.SA` : slug;

          const response = await axios.get(
            `https://query1.finance.yahoo.com/v7/finance/options/${parsedSlug}`,
          );

          let fundamentalInformation: IGetFundamentalInformationResponse = null;
          let dividendsData: IGetDividendsInformationResponse = null;

          if (fundamental) {
            fundamentalInformation = await getFundamentalInformation({ slug });
          }

          if (dividends) {
            dividendsData = await getDividendsInformation({ slug });
          }

          const getHistory = async () => {
            try {
              const historicalResponse = await axios.get(
                `https://query1.finance.yahoo.com/v8/finance/chart/${parsedSlug}${
                  interval && range
                    ? `?includePrePost=false&interval=${interval}&useYfid=true&range=${range}`
                    : '?includePrePost=false&interval=1d&useYfid=true&range=1mo'
                }`,
              );

              const { timestamp } = await historicalResponse.data.chart
                .result[0];
              const {
                low,
                high,
                open,
                close,
                volume,
              } = await historicalResponse.data.chart.result[0].indicators
                .quote[0];

              const { adjclose: adjustedClose } =
                (await historicalResponse.data.chart.result[0].indicators
                  .adjclose[0]) || {};

              const prices: Array<{}> = [];
              for (let index = 0; index < timestamp.length; index++) {
                const price = {
                  date: timestamp[index],
                  open: open[index] || null,
                  high: high[index] || null,
                  low: low[index] || null,
                  close: close[index] || null,
                  volume: volume[index] || null,
                  adjustedClose: adjustedClose[index] || null,
                };

                prices.push(price);
              }

              return prices;
            } catch (error) {
              console.log(error?.message);
            }
          };

          const data: QuoteProps = await response.data.optionChain.result[0]
            .quote;

          if (interval && range) {
            const historicalData = await getHistory();
            const historicalQuote: LooseObject = {
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
              regularMarketTime: new Date(data.regularMarketTime * 1000),
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
              twoHundredDayAverageChangePercent:
                data.twoHundredDayAverageChangePercent,
              validRanges: validRanges,
              historicalDataPrice: historicalData,
            };

            if (fundamental) {
              historicalQuote.priceEarnings =
                fundamentalInformation?.earningsPerShare;
              historicalQuote.earningsPerShare =
                fundamentalInformation?.earningsPerShare;
              historicalQuote.logourl = fundamentalInformation?.logourl
                ? `https://s3-symbol-logo.tradingview.com/${fundamentalInformation?.logourl}--big.svg`
                : 'https://brapi.dev/favicon.svg';
            }

            if (dividends) {
              historicalQuote.dividendsData = dividendsData;
            }

            if (response.status === 200) {
              return historicalQuote;
            }
          }

          const quote: LooseObject = {
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
            regularMarketTime: new Date(data.regularMarketTime * 1000),
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
            twoHundredDayAverageChangePercent:
              data.twoHundredDayAverageChangePercent,
          };

          if (fundamental) {
            quote.priceEarnings = fundamentalInformation?.earningsPerShare;
            quote.earningsPerShare = fundamentalInformation?.earningsPerShare;
            quote.logourl = fundamentalInformation?.logourl
              ? `https://s3-symbol-logo.tradingview.com/${fundamentalInformation?.logourl}--big.svg`
              : 'https://brapi.dev/favicon.svg';
          }

          if (dividends) {
            quote.dividendsData = dividendsData;
          }

          if (response.status === 200) {
            return quote;
          }
        } catch (err) {
          console.log({ err });
          return {
            symbol: slug.toString().toUpperCase(),
            error: true,
            message: `Não encontramos a ação ${slug.toString().toUpperCase()}`,
          };
        }
      });

      const dynamicDate = new Date();
      await Promise.all(promises)
        .then((actualData) => {
          if (actualData?.length === 1 && actualData?.[0]?.error) {
            throw new Error(actualData[0].message);
          }

          res.setHeader(
            'Cache-Control',
            's-maxage=900, stale-while-revalidate',
          );

          res.status(200).json({
            results: actualData,
            requestedAt: dynamicDate,
          });
        })
        .catch((err) => {
          res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate');
          return res.status(404).json({
            error: err.message,
          });
        });
    };

    await responseAllSlugs();
  }
};
