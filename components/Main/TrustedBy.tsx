export const TrustedBy = () => {
  return (
    <section className="mx-auto w-full max-w-6xl">
      <p className="text-center text-base font-medium text-text">
        Confiado por mais de 5.000 clientes
      </p>
      <ul className="mx-auto mt-2 flex flex-wrap justify-center space-x-12">
        <li className="mt-4 hover:opacity-80">
          <img
            src="/trusted-by/ufpel.svg"
            alt="Universidade Federal de Pelotas - UFPEL"
            className="h-12 object-cover"
          />
        </li>
        <li className="mt-4 hover:opacity-80 flex items-center gap-3">
          <img src="/trusted-by/bitbloom.svg" alt="BitBloom" className="h-12" />
          <span className="font-bold text-base text-white cursor-default">
            BitBloom
          </span>
        </li>
        <li className="mt-4 hover:opacity-80">
          <img
            src="/trusted-by/invent-digital.webp"
            alt="Invent Digital"
            className="h-12 object-cover"
          />
        </li>
        <li className="mt-4 hover:opacity-80">
          <img
            src="/trusted-by/mont-capital.png"
            alt="Mont Capital"
            className="h-12 object-cover"
          />
        </li>
        <li className="mt-4 hover:opacity-80">
          <img
            src="/trusted-by/a4mbr.svg"
            alt="A4MBR"
            className="h-12 object-cover"
          />
        </li>
        <li className="mt-4 hover:opacity-80 flex items-center gap-0">
          <img
            src="/trusted-by/vale-investimentos.webp"
            alt="Vale Investimentos"
            className="h-12 object-cover"
          />
          <span className="font-bold text-base text-white cursor-default">
            Vale Invest.
          </span>
        </li>
      </ul>
    </section>
  );
};
