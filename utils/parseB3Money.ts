import { replaceComma } from '~/utils/replaceComma';

export const parseB3Money = (money: string | null): number | null => {
  if (!money) return null;

  return parseFloat(replaceComma(money));
};
