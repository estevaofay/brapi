import {
  getDividendsInformation,
  IGetDividendsInformationResponse,
} from '~/services/getDividendsInformation';
import {
  getFundamentalInformation,
  IGetFundamentalInformationResponse,
} from '~/services/getFundamentalInformation';
import {
  getHistoricalData,
  IGetHistoricalDataResponse,
} from '~/services/getHistoricalData';
import {
  getQuoteInformation,
  IYahooFinanceQuote,
} from '~/services/getQuoteInformation';
import { parseDefaultQuoteData } from '~/utils/parseDefaultQuoteData';
import { validRanges } from '~/constants/validRanges';
import { validIntervals } from '~/constants/validIntervals';

const resolvedPromise = Promise.resolve();

export interface IProcessQuoteSlugData {
  slug: string;
  fundamental: string;
  dividends: string;
  shouldReturnHistoricalData: boolean;
  interval: string;
  range: string;
}

export const processQuoteSlugData = async ({
  slug,
  fundamental,
  dividends,
  shouldReturnHistoricalData,
  interval,
  range,
}: IProcessQuoteSlugData) => {
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
  ] = (await Promise.all(promises)) as [
    IYahooFinanceQuote,
    IGetFundamentalInformationResponse,
    IGetDividendsInformationResponse,
    IGetHistoricalDataResponse[],
  ];

  const parsedQuoteData = await parseDefaultQuoteData({
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
