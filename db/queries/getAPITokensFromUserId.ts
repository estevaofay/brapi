import { eq } from 'drizzle-orm';
import { db, serverlessClient } from '~/db';
import { apiToken, IAPIToken } from '~/db/schemas/tables/apiToken';

interface IGetAPITokensFromUserId {
  userId: string;
}

interface IGetAPITokensFromUserIdResponse {
  data: IAPIToken[];
  took: string;
}

export const getAPITokensFromUserId = async ({
  userId,
}: IGetAPITokensFromUserId): Promise<IGetAPITokensFromUserIdResponse> => {
  try {
    const start = performance.now();
    await serverlessClient.connect();

    const data = await db
      .select()
      .from(apiToken)
      .where(eq(apiToken.userId, userId));

    const end = performance.now();
    await serverlessClient.clean();

    return {
      data,
      took: `${end - start}ms`,
    };
  } catch (error) {
    throw new Error('No API token found');
  }
};
