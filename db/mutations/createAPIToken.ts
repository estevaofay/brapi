import { db, serverlessClient } from '~/db';
import { apiToken, INewAPIToken } from '~/db/schemas/tables/apiToken';

interface ICreateAPIToken {
  userId: string;
}

interface ICreateAPITokenResponse {
  data: INewAPIToken;
  took: string;
}

export const createAPIToken = async ({
  userId,
}: ICreateAPIToken): Promise<ICreateAPITokenResponse> => {
  try {
    const start = performance.now();
    await serverlessClient.connect();

    const data = await db
      .insert(apiToken)
      .values({
        userId,
      })
      .onConflictDoNothing();

    const end = performance.now();
    await serverlessClient.clean();

    return {
      data,
      took: `${end - start}ms`,
    };
  } catch (error) {
    throw new Error('Error creating API token');
  }
};
