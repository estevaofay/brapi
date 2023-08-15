import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { createAPIToken } from '~/db/mutations/createAPIToken';
import { getAPITokens } from '~/db/queries/getAPITokens';
import { encodeAPIToken } from '~/utils/handleAPITokenJWT';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await handleGET(req, res);
      break;
    case 'POST':
      await handlePOST(req, res);
      break;
    default:
      res.status(405).json({
        error: true,
        message: 'Method not allowed',
      });
      break;
  }
};

const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = await getToken({ req });

    console.log({ token });

    if (!token) {
      res.status(401).json({
        error: true,
        message: 'Unauthorized',
      });
      return;
    }

    try {
      const apiTokens = await getAPITokens({
        userId: token.userId,
      });

      const encodedAPITokens = apiTokens.map((apiToken) =>
        encodeAPIToken({ apiTokenId: apiToken.id, userId: token.userId }),
      );

      res.status(200).json({
        encodedAPITokens,
      });
    } catch (error) {
      res.status(400).json({
        error: true,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Internal server error',
    });
  }
};

const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = await getToken({ req });

    if (!token) {
      res.status(401).json({
        error: true,
        message: 'Unauthorized',
      });
      return;
    }

    try {
      const apiToken = await createAPIToken({
        userId: token.userId,
      });

      const encodedAPIToken = encodeAPIToken({
        apiTokenId: apiToken.id,
        userId: token.userId,
      });

      res.status(200).json({
        encodedAPIToken,
      });
    } catch (error) {
      res.status(400).json({
        error: true,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Internal server error',
    });
  }
};
