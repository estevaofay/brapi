import { and, eq, gte, sql } from 'drizzle-orm';
import { serverlessClient, db } from '~/db';
import { ITicker, tickers } from '~/db/schemas/tables/ticker';

interface IGetDBQuoteResponse {
  ticker: ITicker;
  took: string;
}

interface IGetDBQuote {
  slug: string;
  lastXMinute?: number;
}

export const getDBQuote = async ({
  slug,
  lastXMinute = 15,
}: IGetDBQuote): Promise<IGetDBQuoteResponse> => {
  try {
    const start = performance.now();

    await serverlessClient.connect();

    const ticker = await db
      .select()
      .from(tickers)
      .where(
        and(
          eq(tickers.symbol, slug.toUpperCase()),
          gte(
            tickers.updatedAt,
            sql.raw(`(now() - interval '${lastXMinute} minutes')`),
          ),
        ),
      )
      .limit(1);

    await serverlessClient.clean();
    const end = performance.now();

    return {
      ticker: ticker?.[0] ?? null,
      took: (end - start).toFixed(0) + 'ms',
    };
  } catch (err) {
    console.log({ err });
  }
};
