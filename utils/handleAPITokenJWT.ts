import short from 'short-uuid';

interface IToken {
  token: string;
}

interface IAPITokenId {
  apiTokenId: string;
}

const translator = short(short.constants.flickrBase58, {
  consistentLength: true,
});

export const shortenAPIToken = ({ apiTokenId }: IAPITokenId): IToken => {
  const token = translator.fromUUID(apiTokenId);

  return {
    token,
  };
};

export const translateAPIToken = ({ token }: IToken): IAPITokenId => {
  const apiTokenId = translator.toUUID(token);

  return {
    apiTokenId,
  };
};
