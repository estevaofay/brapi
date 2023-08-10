import { PricingGroup } from './PricingGroup';

interface IMainPricing {
  isStandalone?: boolean;
}

interface IMainPricingTitle extends React.HTMLAttributes<HTMLHeadingElement> {
  isStandalone?: boolean;
}

const MainPricingTitle = ({
  isStandalone,
  children,
  ...props
}: IMainPricingTitle) => {
  return isStandalone ? (
    <h1 {...props}>{children}</h1>
  ) : (
    <h2 {...props}>{children}</h2>
  );
};

export const MainPricing = ({ isStandalone }: IMainPricing) => {
  return (
    <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
      <div className="pb-24 pt-12 mx-auto mb-20">
        <div className="flex flex-col w-full">
          <MainPricingTitle
            className="sm:text-4xl text-center text-3xl font-medium title-font mb-2 text-white"
            isStandalone={isStandalone}
          >
            Nossos planos
          </MainPricingTitle>
          <p className="w-2/3 mx-auto leading-relaxed text-base text-center">
            Escolha o plano que melhor se encaixa nas suas necessidades
          </p>
        </div>
        <PricingGroup isStandalone={isStandalone} />
      </div>
    </section>
  );
};
