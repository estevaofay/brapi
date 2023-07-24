import { Pricing } from './Pricing';

const plans = [
  {
    title: 'Gratuito',
    price: '$0',
    features: [
      'Suporte básico',
      '20 requisições por minuto*',
      'Até 1 ação por requisição*',
      'Dados atualizados a cada 30 minutos*',
    ],
    buttonUrl: '/docs',
    observation: '*Ilimitado enquanto outros planos não estiverem disponíveis',
  },
  {
    title: 'Startup',
    price: 'Em breve',
    features: [
      'Suporte premium',
      '100 requisições por minuto',
      'Até 10 ações por requisição',
      'Dados atualizados a cada 15 minutos',
      'Dados históricos',
      'Dados de dividendos',
    ],
    buttonUrl: '',
    observation: 'Ideal para apps e sites com tráfego moderado',
  },
  {
    title: 'Enterprise',
    price: 'Em breve',
    features: [
      'Suporte super premium',
      '1000 requisições por minuto',
      'Até 20 ações por requisição',
      'Dados atualizados a cada 5 minutos',
      'Dados históricos',
      'Dados de dividendos',
    ],
    buttonUrl: '',
    observation:
      'Ideal para machine learning, apps e sites com tráfego intenso',
  },
];

interface IPricingGroup {
  isStandalone?: boolean;
}

export const PricingGroup = ({ isStandalone }: IPricingGroup) => {
  return (
    <div className="flex flex-wrap mx-auto xl:justify-center">
      {plans.map((plan, index) => (
        <div key={index} className="p-4 xl:w-1/4 md:w-1/2 w-full">
          <Pricing isStandalone={isStandalone} {...plan} />
        </div>
      ))}
    </div>
  );
};
