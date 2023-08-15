import { db } from '~/db';
import { apiToken, INewAPIToken } from '~/db/schemas/tables/apiToken';

interface ICreateAPIToken {
  userId: string;
}

export const createAPIToken = async ({
  userId,
}: ICreateAPIToken): Promise<INewAPIToken> => {
  try {
    const data = await db
      .insert(apiToken)
      .values({
        userId,
      })
      .onConflictDoNothing();

    return data;
  } catch (error) {
    throw new Error('Error creating API token');
  }
};
