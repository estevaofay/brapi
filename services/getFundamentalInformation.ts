import axios from 'axios';

interface IGetFundamentalInformation {
  slug: string;
}

export interface IGetFundamentalInformationResponse {
  priceEarnings: number | null;
  earningsPerShare: number | null;
  logourl: string | null;
}

export const getFundamentalInformation = async ({
  slug,
}: IGetFundamentalInformation): Promise<IGetFundamentalInformationResponse> => {
  const formDataTradingView = {
    symbols: {
      tickers: [`BMFBOVESPA:${slug.toUpperCase()}`],
      query: {
        types: [],
      },
    },
    columns: ['price_earnings_ttm', 'earnings_per_share_basic_ttm', 'logoid'],
  };

  try {
    const { data } = await axios.post(
      `https://scanner.tradingview.com/brazil/scan`,
      formDataTradingView,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    const [priceEarnings, earningsPerShare, logoSlug] = data.data?.[0]?.d;

    const logourl = logoSlug
      ? `https://s3-symbol-logo.tradingview.com/${logoSlug}--big.svg`
      : 'https://brapi.dev/favicon.svg';

    return {
      priceEarnings,
      earningsPerShare,
      logourl,
    };
  } catch (error) {
    return {
      priceEarnings: null,
      earningsPerShare: null,
      logourl: 'https://brapi.dev/favicon.svg',
    };
  }
};
