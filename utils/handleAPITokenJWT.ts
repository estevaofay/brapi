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
  const token = sign({ apiTokenId, userId }, process.env.JWT_SECRET, {
    expiresIn: '10y',
    algorithm: 'HS256',
    noTimestamp: true,
  });

  console.log({ token });

  return {
    token,
  };
};

interface IDecodeAPIToken {
  apiTokenId: string;
  userId: string;
}

export const decodeAPIToken = (token: string): IDecodeAPIToken => {
  const data = verify(token, process.env.JWT_SECRET, {
    algorithms: ['HS256'],
  }) as IDecodeAPIToken;

  console.log({ data });

  return {
    apiTokenId: data?.apiTokenId,
    userId: data?.userId,
  };
};
