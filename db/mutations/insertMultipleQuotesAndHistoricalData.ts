import { sql } from 'drizzle-orm';
import { serverlessClient, db } from '~/db';
import { INewHistoricalData, historicalData } from '~/db/schemas';
import { tickers, INewTicker } from '~/db/schemas/tables/ticker';
import { processQuoteSlugData } from '~/server/api/handleQuoteSlugs';

type IProcessQuoteSlugDataResponse = Awaited<
  ReturnType<typeof processQuoteSlugData>
>;

export const insertMultipleQuotesAndHistoricalData = async (
  responses: IProcessQuoteSlugDataResponse[],
) => {
  try {
    const start = performance.now();

    const allHistoricalDataPrices: INewHistoricalData[] = responses
      .map((response) => {
        const { historicalDataPrice: historicalDataResponses } = response;

        const historicalDataPrices = historicalDataResponses?.map(
          (historicalDataResponse) => ({
            ...historicalDataResponse,
            symbol: response.symbol,
          }),
        );

        return historicalDataPrices ?? [];
      })
      .flat();

    const responsesToSaveInDB = responses.filter((response) => {
      return !response.hasOwnProperty('updatedAt');
    });

    const allTickers: INewTicker[] =
      responsesToSaveInDB?.map((responseToSaveInDB) => {
        const {
          dividendsData,
          historicalDataPrice,
          validRanges,
          validIntervals,
          ...quote
        } = responseToSaveInDB;

        return {
          ...quote,
          updatedAt: new Date().toISOString(),
        };
      }) || [];

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
      if (allHistoricalDataPrices?.length) {
        await trx
          .insert(historicalData)
          .values(allHistoricalDataPrices)
          .onConflictDoNothing();
      }

      if (allTickers?.length) {
        await trx
          .insert(tickers)
          .values(allTickers)
          .onConflictDoUpdate({
            target: [tickers.symbol],
            set: excludedTickers,
          });
      }
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
