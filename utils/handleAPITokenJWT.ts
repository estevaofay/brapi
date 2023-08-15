import { sign, verify } from 'jsonwebtoken';

interface IEncodeAPITokenResponse {
  token: string;
}

interface IEncodeAPIToken {
  apiTokenId: string;
  userId: string;
}

export const encodeAPIToken = ({
  apiTokenId,
  userId,
}: IEncodeAPIToken): IEncodeAPITokenResponse => {
  const token = sign({ apiTokenId, userId }, process.env.API_TOKEN_JWT_SECRET, {
    expiresIn: '10y',
    algorithm: 'HS256',
    noTimestamp: true,
  });

  return {
    token,
  };
};

interface IDecodeAPIToken {
  apiTokenId: string;
  userId: string;
}

export const decodeAPIToken = (token: string): IDecodeAPIToken => {
  const data = verify(token, process.env.API_TOKEN_JWT_SECRET, {
    algorithms: ['HS256'],
  }) as IDecodeAPIToken;

  return {
    apiTokenId: data?.apiTokenId,
    userId: data?.userId,
  };
};
