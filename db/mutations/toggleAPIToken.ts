import { eq, sql } from 'drizzle-orm';
import { db, serverlessClient } from '~/db';
import { apiToken, INewAPIToken } from '~/db/schemas/tables/apiToken';

interface IToggleAPIToken {
  id: string;
}

interface IToggleAPITokenResponse {
  data: INewAPIToken;
  took: string;
}

export const toggleAPIToken = async ({
  id,
}: IToggleAPIToken): Promise<IToggleAPITokenResponse> => {
  try {
    const start = performance.now();
    await serverlessClient.connect();

    const data = await db
      .update(apiToken)
      .set({
        active: sql`NOT ${apiToken.active}`,
      })
      .where(eq(apiToken.id, id))
      .returning();

    const end = performance.now();
    await serverlessClient.clean();

    return {
      data: data?.[0],
      took: `${end - start}ms`,
    };
  } catch (error) {
    throw new Error('Error creating API token');
  }
};
