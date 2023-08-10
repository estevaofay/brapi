import { sql } from 'drizzle-orm';
import { serverlessClient, db } from '~/database';
import {
  historicalData,
  IHistoricalDataInsert,
  ITicker,
  tickers,
} from '~/database/schemas/schema';
import { processQuoteSlugData } from '~/server/api/handleQuoteSlugs';

type IProcessQuoteSlugDataResponse = Awaited<
  ReturnType<typeof processQuoteSlugData>
>;

export const insertMultipleQuotesAndHistoricalData = async (
  responses: IProcessQuoteSlugDataResponse[],
) => {
  try {
    const start = performance.now();

    const allHistoricalDataPrices: IHistoricalDataInsert[] = responses
      .map((response) => {
        const { historicalDataPrice: historicalDataResponse } = response;

        const historicalDataPrices = historicalDataResponse.map(
          ({ date, open, high, low, close, volume }) => ({
            symbol: response.symbol,
            date,
            open,
            high,
            low,
            close,
            volume,
          }),
        );

        return historicalDataPrices;
      })
      .flat();

    const allTickers: ITicker[] = responses.map((response) => {
      const {
        dividendsData,
        historicalDataPrice,
        validRanges,
        validIntervals,
        ...quote
      } = response;

      return quote;
    });

    const excludedTickers = {
      ...Object.fromEntries(
        Object.keys(allTickers[0] ?? {}).map((field) => [
          field,
          sql.raw(`excluded."${field}"`),
        ]),
      ),
    };

    await serverlessClient.connect();

    await db.transaction(async (trx) => {
      await trx
        .insert(historicalData)
        .values(allHistoricalDataPrices)
        .onConflictDoNothing();

      await trx
        .insert(tickers)
        .values(allTickers)
        .onConflictDoUpdate({
          target: [tickers.symbol],
          set: excludedTickers,
        });
    });

    await serverlessClient.clean();
    const end = performance.now();

    return {
      took: (end - start).toFixed(0) + 'ms',
    };
  } catch (err) {
    console.log({ err });
  }
};
