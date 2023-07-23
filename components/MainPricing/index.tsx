import { PricingGroup } from './PricingGroup';

export const MainPricing = () => {
  return (
    <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
      <div className="pb-24 pt-12 mx-auto mb-20">
        <div className="flex flex-col w-full">
          <h1 className="sm:text-4xl text-center text-3xl font-medium title-font mb-2 text-white">
            Nossos planos
          </h1>
          <p className="w-2/3 mx-auto leading-relaxed text-base text-center">
            Escolha o plano que melhor se encaixa nas suas necessidades
          </p>
        </div>
        <PricingGroup />
      </div>
    </section>
  );
};
