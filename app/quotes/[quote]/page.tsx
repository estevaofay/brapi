import MainQuotes from '~/components/MainQuotes';

const Quotes = () => {
  return (
    <main>
      <section className="max-w-screen min-h-screen">
        <div className="container mx-auto flex flex-col px-5 py-0 md:py-2 items-center">
          {/* @ts-expect-error Server Component */}
          <MainQuotes />
        </div>
      </section>
    </main>
  );
};

export default Quotes;
