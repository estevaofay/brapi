import { Accordion } from './Accordion';

const faq = [
  {
    title: 'A API é realmente gratuita?',
    content:
      'Sim, a API é gratuita para uso atualmente e não possui limitações em termos de uso.',
    isDefaultOpen: true,
  },
  {
    title: 'Posso utilizar a API para fins comerciais?',
    content:
      'Nossa API oferece suporte tanto para uso pessoal quanto para uso comercial. Atualmente, não há restrições quanto ao uso comercial da nossa API.',
  },
  {
    title: 'Vocês possuem algum canal para divulgar novidades e atualizações?',
    content: (
      <>
        Sim! Para se manter atualizado sobre as últimas novidades, atualizações
        e anúncios importantes do nosso projeto, convidamos você a acompanhar
        nossa página no{' '}
        <a
          href="https://www.linkedin.com/company/brapi.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="link link-primary"
        >
          LinkedIn
        </a>
        . <br />
        <br /> Lá, compartilhamos informações relevantes sobre o projeto,
        melhorias na API, lançamento de novos recursos e muito mais.
      </>
    ),
  },
];

export const FAQ = () => {
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-2/3 flex flex-col sm:flex-row mx-auto gap-4">
          <h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-white">
            Perguntas frequentes sobre a brapi
          </h1>

          <div className="flex flex-col gap-2 max-w-md">
            <div className="flex flex-col gap-2">
              {faq.map((item, index) => (
                <Accordion key={index} {...item} />
              ))}
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <p className="text-sm text-gray-400">
                Ainda tem dúvidas? Acesse nossa página de perguntas frequentes.
              </p>

              <a href="/faq" className="btn btn-outline w-fit">
                Ver mais perguntas
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
