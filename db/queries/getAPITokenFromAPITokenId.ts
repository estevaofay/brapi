import { and, eq } from 'drizzle-orm';
import { db, serverlessClient } from '~/db';
import { apiToken, IAPIToken } from '~/db/schemas/tables/apiToken';

interface IGetAPITokenFromAPITokenId {
  apiTokenId: string;
}

export const getAPITokenFromAPITokenId = async ({
  apiTokenId,
}: IGetAPITokenFromAPITokenId): Promise<IAPIToken> => {
  const start = performance.now();
  await serverlessClient.connect();

  const [data] = await db
    .select()
    .from(apiToken)
    .where(and(eq(apiToken.id, apiTokenId), eq(apiToken.active, true)))
    .limit(1);

  const end = performance.now();
  await serverlessClient.clean();

  return data;
};
