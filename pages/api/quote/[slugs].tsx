import { logHost } from '../../../utils/logHost';
import { NextApiRequest, NextApiResponse } from 'next';
import { processQuoteSlugData } from '~/server/api/handleQuoteSlugs';
import { validRanges } from '~/constants/validRanges';
import { validIntervals } from '~/constants/validIntervals';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  logHost(req, 'quote');

  const { slugs, interval, range, fundamental, dividends } = req.query;

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
          return await processQuoteSlugData({
            slug,
            dividends,
            fundamental,
            interval,
            range,
            shouldReturnHistoricalData,
          });
        } catch (err) {
          console.log({ err });

          const errorMessage = err?.response?.data?.chart?.error?.description;

          return {
            symbol: slug.toString().toUpperCase(),
            error: true,
            message:
              errorMessage ||
              `Não encontramos a ação ${slug.toString().toUpperCase()}`,
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
