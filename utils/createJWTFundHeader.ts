export const createJWTFundHeader = (identifierFund: string) => {
  const jwtHeader = {
    identifierFund,
  };

  const jwtHeaderString = Buffer.from(JSON.stringify(jwtHeader)).toString(
    'base64',
  );

  return jwtHeaderString;
};
