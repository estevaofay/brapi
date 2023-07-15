import { Testimonials } from '~/components/Main/Testimonials';
import { SideScroller } from '~/components/MainQuotes/SideScroller';
import { Brands } from './Brands';
import { CTA } from './CTA';
import { Features } from './Features';
import { Hero } from './Hero';
import { Numbers } from './Numbers';
import { WhatWeDo } from './WhatWeDo';

const Main = async () => {
  return (
    <main>
      {/* @ts-expect-error Server Component */}
      <SideScroller />
      <Hero />
      <WhatWeDo />
      <Brands />
      <Features />
      <Testimonials />
      <Numbers />
      <CTA />
    </main>
  );
};

export default Main;
