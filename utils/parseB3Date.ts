import { parseDMY } from '~/utils/parseDMY';

export const parseB3Date = (date?: string): Date | null => {
  if (!date) return null;

  return new Date(parseDMY(date));
};
