import { logHost } from '../../../utils/logHost';
import { NextApiRequest, NextApiResponse } from 'next';
import { getFundamentalInformation } from '~/services/getFundamentalInformation';
import { getDividendsInformation } from '~/services/getDividendsInformation';
import { getHistoricalData } from '~/services/getHistoricalData';
import { getQuoteInformation } from '~/services/getQuoteInformation';
import { parseDefaultQuoteData } from '~/utils/parseDefaultQuoteData';

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

  const validIntervals = [
    '1m',
    '2m',
    '5m',
    '15m',
    '30m',
    '60m',
    '90m',
    '1h',
    '1d',
    '5d',
    '1wk',
    '1mo',
    '3mo',
  ];

  if (interval && !validIntervals.includes(interval.toString())) {
    return res.status(400).json({
      error: true,
      message: `Intervalo inválido. Intervalos válidos: ${validIntervals.join(
        ', ',
      )}`,
    });
  }

  if (range && !validRanges.includes(range.toString())) {
    return res.status(400).json({
      error: true,
      message: `Range inválido. Ranges válidos: ${validRanges.join(', ')}`,
    });
  }

  const allSlugs = slugs.toString().split(',');
  const shouldReturnHistoricalData = interval && range;

  if (slugs) {
    const responseAllSlugs = async () => {
      const promises = allSlugs.map(async (slug) => {
        try {
          const isBrazilianStock = /\d/.test(slug);

          const parsedSlug = isBrazilianStock ? `${slug}.SA` : slug;

          const data = await getQuoteInformation({ slug: parsedSlug });

          const fundamentalInformation = fundamental
            ? await getFundamentalInformation({ slug })
            : null;

          const dividendsData = dividends
            ? await getDividendsInformation({ slug })
            : null;

          const historicalData = shouldReturnHistoricalData
            ? await getHistoricalData({
                slug: parsedSlug,
                interval: interval.toString(),
                range: range.toString(),
              })
            : null;

          const parsedQuoteData = await parseDefaultQuoteData({
            data,
            slug,
          });

          const quote = {
            ...parsedQuoteData,
            ...(shouldReturnHistoricalData && {
              historicalDataPrice: historicalData,
              validRanges,
              validIntervals,
            }),
            ...(fundamental && { ...fundamentalInformation }),
            ...(dividends && { dividendsData }),
          };

          if (Object.keys(quote).length > 0) {
            return quote;
          }
        } catch (err) {
          return {
            symbol: slug.toString().toUpperCase(),
            error: true,
            message: `Não encontramos a ação ${slug.toString().toUpperCase()}`,
          };
        }
      });

      try {
        const dynamicDate = new Date();
        const results = await Promise.all(promises);

        // @ts-expect-error Catch error from API
        if (results?.length === 1 && results?.[0]?.error) {
          // @ts-expect-error Catch error from API
          throw new Error(results[0].message);
        }

        res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate');

        res.status(200).json({
          results,
          requestedAt: dynamicDate,
        });
      } catch (err) {
        res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate');
        return res.status(404).json({
          error: err.message,
        });
      }
    };

    await responseAllSlugs();
  }
};
