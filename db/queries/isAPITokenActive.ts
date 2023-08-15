import { and, eq } from 'drizzle-orm';
import { db } from '~/db';
import { apiToken } from '~/db/schemas/tables/apiToken';

interface IIsAPITokenActive {
  apiTokenId: string;
}

export const isAPITokenActive = async ({
  apiTokenId,
}: IIsAPITokenActive): Promise<boolean> => {
  const data = await db
    .select()
    .from(apiToken)
    .where(and(eq(apiToken.id, apiTokenId), eq(apiToken.active, true)))
    .limit(1);

  return data?.length > 0 ? true : false;
};
