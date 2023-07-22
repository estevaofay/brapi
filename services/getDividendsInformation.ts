import axios from 'axios';
import { createJWTFundHeader } from '~/utils/createJWTFundHeader';
import { filterNullFields } from '~/utils/filterNullFields';
import { parseB3Date } from '~/utils/parseB3Date';
import { parseB3Money } from '~/utils/parseB3Money';

interface IGetDividendsInformation {
  slug: string;
}

interface ICashDividends {
  assetIssued: string;
  paymentDate: Date;
  rate: number;
  relatedTo: string;
  approvedOn: Date;
  isinCode: string;
  label: string;
  lastDatePrior: Date;
  remarks: string;
}

interface IStockDividends {
  assetIssued: string;
  factor: number;
  approvedOn: Date;
  isinCode: string;
  label: string;
  lastDatePrior: Date;
  remarks: string;
}

interface ISubscriptions {
  assetIssued: string;
  percentage: number;
  priceUnit: number;
  tradingPeriod: string;
  subscriptionDate: Date;
  approvedOn: Date;
  isinCode: string;
  label: string;
  lastDatePrior: Date;
  remarks: string;
}

type IB3ServiceCashDividends = Record<keyof ICashDividends, string>;
type IB3ServiceStockDividends = Record<keyof IStockDividends, string>;
type IB3ServiceSubscriptions = Record<keyof ISubscriptions, string>;

interface IB3ServiceDividends {
  cashDividends: IB3ServiceCashDividends[];
  stockDividends: IB3ServiceStockDividends[];
  subscriptions: IB3ServiceSubscriptions[];
}

export interface IGetDividendsInformationResponse {
  cashDividends: ICashDividends[];
  stockDividends: IStockDividends[];
  subscriptions: ISubscriptions[];
}

export const getDividendsInformation = async ({
  slug,
}: IGetDividendsInformation): Promise<IGetDividendsInformationResponse> => {
  const jwtHeaderString = createJWTFundHeader(slug);

  try {
    const responseDividends = await axios.get<IB3ServiceDividends>(
      `https://sistemaswebb3-listados.b3.com.br/fundsProxy/fundsCall/GetListedSupplementFunds/${jwtHeaderString}`,
    );

    const { cashDividends, stockDividends, subscriptions } =
      responseDividends?.data || {};

    const dividendParser = (
      eachDividend: IB3ServiceCashDividends &
        IB3ServiceStockDividends &
        IB3ServiceSubscriptions,
    ) => {
      if (!eachDividend) return null;

      const paymentDate = parseB3Date(eachDividend?.paymentDate);
      const approvedOn = parseB3Date(eachDividend?.approvedOn);
      const lastDatePrior = parseB3Date(eachDividend?.lastDatePrior);
      const rate = parseB3Money(eachDividend?.rate);
      const factor = parseB3Money(eachDividend?.factor);
      const percentage = parseB3Money(eachDividend?.percentage);
      const priceUnit = parseB3Money(eachDividend?.priceUnit);
      const subscriptionDate = parseB3Date(eachDividend?.subscriptionDate);

      const data = {
        ...eachDividend,
        paymentDate,
        approvedOn,
        lastDatePrior,
        rate,
        factor,
        percentage,
        priceUnit,
        subscriptionDate,
      };

      return filterNullFields(data) as ICashDividends &
        IStockDividends &
        ISubscriptions;
    };

    const parsedData = {
      cashDividends: cashDividends?.map(dividendParser),
      stockDividends: stockDividends?.map(dividendParser),
      subscriptions: subscriptions?.map(dividendParser),
    };

    return parsedData as IGetDividendsInformationResponse;
  } catch (error) {
    return {
      cashDividends: [],
      stockDividends: [],
      subscriptions: [],
    };
  }
};
