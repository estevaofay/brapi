import { getDividendsInformation } from '~/services/getDividendsInformation';
import { getFundamentalInformation } from '~/services/getFundamentalInformation';
import { getHistoricalData } from '~/services/getHistoricalData';
import { getQuoteInformation } from '~/services/getQuoteInformation';
import { parseDefaultQuoteData } from '~/utils/parseDefaultQuoteData';
import { validRanges } from '~/constants/validRanges';
import { validIntervals } from '~/constants/validIntervals';

const resolvedPromise = new Promise((resolve) => resolve({}));

interface IProcessQuoteSlugData {
  fundamental: boolean;
  dividends: string;
  shouldReturnHistoricalData: boolean;
  interval: number;
  range: number;
}

export const processQuoteSlugData = async ({
  slug,
  fundamental,
  dividends,
  shouldReturnHistoricalData,
  interval,
  range,
}): Promise<IProcessQuoteSlugData> => {
  const isBrazilianStock = /\d/.test(slug);

  const parsedSlug = isBrazilianStock ? `${slug}.SA` : slug;

  const promises = [];

  promises.push(getQuoteInformation({ parsedSlug }));

  promises.push(
    fundamental === 'true'
      ? getFundamentalInformation({ slug })
      : resolvedPromise,
  );

  promises.push(
    dividends === 'true' ? getDividendsInformation({ slug }) : resolvedPromise,
  );

  promises.push(
    shouldReturnHistoricalData
      ? getHistoricalData({
          parsedSlug,
          interval: interval.toString(),
          range: range.toString(),
        })
      : resolvedPromise,
  );

  const [
    data,
    fundamentalInformation,
    dividendsData,
    historicalData,
  ] = await Promise.all(
    promises.map((promise) => promise.catch((e) => console.error(e))),
  );

  const parsedQuoteData = parseDefaultQuoteData({
    data,
    slug,
  });

  const quote = {
    ...parsedQuoteData,
    ...(shouldReturnHistoricalData && {
      historicalDataPrice: historicalData,
      validRanges,
      validIntervals,
    }),
    ...(fundamental === 'true' && { ...fundamentalInformation }),
    ...(dividends === 'true' && { dividendsData }),
  };

  if (Object.keys(quote).length > 0) {
    return quote;
  }
};
