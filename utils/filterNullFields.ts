export const filterNullFields = (obj: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => value !== null),
  );
};
