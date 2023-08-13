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
  let token = userId;

  return {
    token,
  };
};

export const isValidAPIToken = (token: string): boolean => {
  // todo: verify jwt token with process.env.JWT_SECRET
  return true;
};
