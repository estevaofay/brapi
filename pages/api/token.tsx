import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { createAPIToken } from '~/utils/apiToken';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });

  if (!token) {
    res.status(401).json({
      error: 'Unauthorized',
    });
    return;
  }

  const { token: apiToken } = createAPIToken({
    userId: token.userId,
  });

  res.status(200).json({
    apiToken,
  });
};
