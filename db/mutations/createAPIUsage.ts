import { db, serverlessClient } from '~/db';
import { apiUsage, INewAPIUsage } from '~/db/schemas/tables/apiUsage';

type ICreateAPIUsage = Pick<INewAPIUsage, 'userId' | 'endpoint' | 'count'>;

export const createAPIUsage = async ({
  count,
  endpoint,
  userId,
}: ICreateAPIUsage) => {
  try {
    const start = performance.now();
    await serverlessClient.connect();

    await db
      .insert(apiUsage)
      .values({
        userId,
        endpoint,
        count,
      })
      .onConflictDoNothing();

    await serverlessClient.clean();
    const end = performance.now();

    return {
      took: (end - start).toFixed(0) + 'ms',
    };
  } catch (err) {
    console.log({ err });
  }
};
