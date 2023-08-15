import { eq } from 'drizzle-orm';
import { db } from '~/db';
import { apiToken, IAPIToken } from '~/db/schemas/tables/apiToken';

interface IIsAPITokenActive {
  userId: string;
}

export const getAPITokens = async ({
  userId,
}: IIsAPITokenActive): Promise<IAPIToken[]> => {
  try {
    const data = await db
      .select()
      .from(apiToken)
      .where(eq(apiToken.userId, userId));

    return data;
  } catch (error) {
    throw new Error('No API token found');
  }
};
