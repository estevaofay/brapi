interface IGetAPITokenResponse {
  token: string;
}

interface ICreateAPIToken {
  userId: string;
}

export const createAPIToken = ({
  userId,
}: ICreateAPIToken): IGetAPITokenResponse => {
  // todo: sign jwt with userId as data and process.env.JWT_SECRET as secret

  return {
    token: userId,
  };
};

export const decodeAPIToken = (token: string) => {
  // todo: decode token
  return { userId: 'userId' };
};

export const isValidAPIToken = (token: string): boolean => {
  // todo: verify jwt token with process.env.JWT_SECRET
  return true;
};
