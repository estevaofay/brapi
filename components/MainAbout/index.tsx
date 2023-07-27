import Link from 'next/link';

export const MainAbout = () => {
  return (
    <main>
      <section className="text-white bg-gray-900 body-font max-w-screen">
        <div className="container mx-auto flex flex-col px-5 py-0 md:py-24 text-left prose prose-invert prose-headings:text-white prose-a:text-white prose-strong:text-white prose-li:marker:text-white text-white">
          <h1>Bem-vindo(a) à brapi!</h1>
          <p>
            Na brapi, estamos comprometidos em simplificar o acesso a dados
            financeiros e promover a democratização das informações no mercado
            de ações e moedas. Somos uma plataforma open source que oferece uma
            poderosa API para desenvolvedores, empresas e entusiastas do mercado
            financeiro.
          </p>
          <h2>Nossa Missão</h2>
          <p>
            Nossa missão é fornecer uma solução abrangente e acessível para o
            acesso a dados financeiros, permitindo que nossos usuários
            desenvolvam soluções inovadoras e tomem decisões informadas.
          </p>
          <h2>Recursos Principais</h2>
          <p>
            Aqui estão alguns dos recursos principais oferecidos pela brapi:
          </p>
          <ol>
            <li>
              <p>
                <strong>Dados Financeiros Atualizados</strong>: Oferecemos dados
                atualizados de ações, incluindo valores de abertura, fechamento,
                máximo e mínimo do dia, além de informações detalhadas sobre
                empresas listadas no mercado de ações IBOVESPA.
              </p>
            </li>
            <li>
              <p>
                <strong>Conversão de Moedas Abrangente</strong>: Nossa API
                permite a conversão de mais de 50 moedas diferentes, facilitando
                transações internacionais e o acompanhamento de taxas de câmbio.
              </p>
            </li>
            <li>
              <p>
                <strong>Histórico da Inflação Brasileira</strong>:
                Disponibilizamos dados históricos da inflação do real brasileiro
                (R$) desde 1994, oferecendo uma ferramenta valiosa para análises
                econômicas e financeiras.
              </p>
            </li>
            <li>
              <p>
                <strong>Atualizações em Tempo Real</strong>: As informações das
                ações são atualizadas a cada 15 minutos, garantindo que nossos
                usuários tenham acesso aos dados mais recentes do mercado.
              </p>
            </li>
            <li>
              <p>
                <strong>Gratuito e Ilimitado</strong>: Atualmente, nossa API é
                gratuita e não possui limitações de uso.
              </p>
            </li>
          </ol>
          <h2>Nosso Compromisso</h2>
          <p>
            Na brapi, valorizamos a qualidade dos dados e a confiabilidade da
            nossa API. Nossos desenvolvedores trabalham continuamente para
            garantir a precisão e a atualização constante das informações.
          </p>
          <h2>Para Desenvolvedores e Empresas</h2>
          <p>
            Nossa API é especialmente projetada para atender às necessidades de
            desenvolvedores e empresas que buscam uma solução simplificada para
            acessar dados financeiros confiáveis. Com uma integração versátil,
            você pode criar aplicativos, sites e ferramentas de análise com
            facilidade.
          </p>
          <h2>Junte-se a Nós!</h2>
          <p>
            Estamos empolgados em compartilhar a experiência da brapi com você!
            Junte-se à nossa comunidade e descubra como nossa API pode
            impulsionar suas análises financeiras e melhorar suas tomadas de
            decisão.
          </p>
          <p>
            Explore a brapi agora mesmo e experimente o poder de acessar dados
            financeiros de forma simples e gratuita!
          </p>

          <Link prefetch={false} href="/docs" className="btn btn-neutral">
            Ver documentação
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
};
