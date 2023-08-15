import { logHost } from '../../../utils/logHost';
import { NextApiRequest, NextApiResponse } from 'next';
import { processQuoteSlugData } from '~/server/api/handleQuoteSlugs';
import { validRanges } from '~/constants/validRanges';
import { validIntervals } from '~/constants/validIntervals';
import { insertMultipleQuotesAndHistoricalData } from '~/db/mutations/insertMultipleQuotesAndHistoricalData';
import { createAPIUsage } from '~/db/mutations/createAPIUsage';
import { translateAPIToken } from '~/utils/handleAPITokenJWT';
import { getAPITokenFromAPITokenId } from '~/db/queries/getAPITokenFromAPITokenId';

interface IQuery {
  slugs?: string;
  interval?: string;
  range?: string;
  fundamental?: string;
  dividends?: string;
  token?: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  logHost(req, 'quote');

  const {
    slugs,
    interval,
    range,
    fundamental,
    dividends,
    token,
  } = req.query as IQuery;

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

  const { apiTokenId } = token?.length
    ? translateAPIToken({ token })
    : ({} as ReturnType<typeof translateAPIToken>);

  const { active: isAPITokenValid, userId } = apiTokenId
    ? (await getAPITokenFromAPITokenId({
        apiTokenId,
      })) || {}
    : ({} as Awaited<ReturnType<typeof getAPITokenFromAPITokenId>>);

  console.log({ isAPITokenValid });

  if (token && !isAPITokenValid) {
    return res.status(401).json({
      error: true,
      message: 'Token inválido',
    });
  }

  const allSlugs = slugs.toString().split(',');
  const shouldReturnHistoricalData = interval && range ? true : false;

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

        // @ts-ignore - typescript is not recognizing the error property
        if (results?.length === 1 && results?.[0]?.error) {
          // @ts-ignore - typescript is not recognizing the message property
          throw new Error(results[0].message);
        }

        const { took } = (await insertMultipleQuotesAndHistoricalData(
          // @ts-ignore - TODO: create a type for this
          results,
        )) || {
          took: 0,
        };

        if (userId && apiTokenId) {
          await createAPIUsage({
            count: results.length,
            endpoint: 'quote',
            userId: userId,
            apiTokenId,
          });
        }

        const maxAge = isAPITokenValid ? 600 : 900;

        res.setHeader(
          'Cache-Control',
          `s-maxage=${maxAge}, stale-while-revalidate`,
        );

        res.status(200).json({
          results,
          requestedAt: dynamicDate,
          took,
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
