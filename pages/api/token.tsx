import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { createAPIToken } from '~/db/mutations/createAPIToken';
import { toggleAPIToken } from '~/db/mutations/toggleAPIToken';
import { getAPITokensFromUserId } from '~/db/queries/getAPITokensFromUserId';
import { shortenAPIToken } from '~/utils/handleAPITokenJWT';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await handleGET(req, res);
      break;
    case 'POST':
      await handlePOST(req, res);
      break;
    case 'PUT':
      await handlePUT(req, res);
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

    if (!token) {
      res.status(401).json({
        error: true,
        message: 'Unauthorized',
      });
      return;
    }

    try {
      const apiTokens = await getAPITokensFromUserId({
        userId: token.userId,
      });

      const encodedAPITokens = apiTokens.data.map((apiToken) => ({
        ...apiToken,
        encodedAPIToken: shortenAPIToken({
          apiTokenId: apiToken.id,
        }).token,
      }));

      res.status(200).json({
        encodedAPITokens,
        took: apiTokens.took,
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

      console.log({ apiToken });

      const { token: shortenedAPIToken } = shortenAPIToken({
        apiTokenId: apiToken.data.id,
      });

      res.status(200).json({
        shortenedAPIToken,
        took: apiToken.took,
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

const handlePUT = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.id) {
    res.status(400).json({
      error: true,
      message: 'Missing id',
    });
    return;
  }

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
      const apiToken = await toggleAPIToken({
        id: req.body.id,
      });

      res.status(200).json({
        message: 'API token toggled',
        took: apiToken.took,
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
