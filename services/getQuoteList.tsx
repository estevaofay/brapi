export interface IQuoteList {
  stock: string;
  name: string;
  close: number;
  change: number;
  logo: string;
}

interface IGetQuoteList {
  limit?: number;
  search?: string;
  sortBy?:
    | 'name'
    | 'close'
    | 'change'
    | 'change_abs'
    | 'volume'
    | 'market_cap_basic';
  sortOrder?: 'desc' | 'asc';
  hideIndex?: boolean;
}

export const getQuoteList = async (args?: IGetQuoteList) => {
  try {
    const url = new URL('https://brapi.dev/api/quote/list');

    const params = {
      sortBy: args?.sortBy || 'volume',
      sortOrder: args?.sortOrder || 'desc',
      limit: args?.limit || 20,
      search: args?.search || '',
    };

    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key]),
    );

    const res = await fetch(url.toString(), { cache: 'no-cache' });

    const data = await res.json();

    if (!data) return [];

    if (args?.hideIndex) return data?.stocks as IQuoteList[];

    const limitedIndexes =
      data?.indexes?.slice(0, (args?.limit || 4) / 2) || [];

    const mergedData = [...limitedIndexes, ...data?.stocks] as IQuoteList[];

    return mergedData;
  } catch (err) {}
};
