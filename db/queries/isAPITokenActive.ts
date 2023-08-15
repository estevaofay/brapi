import { and, eq } from 'drizzle-orm';
import { db, serverlessClient } from '~/db';
import { apiToken } from '~/db/schemas/tables/apiToken';

interface IIsAPITokenActive {
  apiTokenId: string;
}

export const isAPITokenActive = async ({
  apiTokenId,
}: IIsAPITokenActive): Promise<boolean> => {
  const start = performance.now();
  await serverlessClient.connect();

  const data = await db
    .select()
    .from(apiToken)
    .where(and(eq(apiToken.id, apiTokenId), eq(apiToken.active, true)))
    .limit(1);

  const end = performance.now();
  await serverlessClient.clean();

  console.log(`isAPITokenActive: ${end - start}ms`);

  return data?.length > 0 ? true : false;
};
