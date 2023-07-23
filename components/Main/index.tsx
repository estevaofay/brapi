import { Testimonials } from '~/components/Main/Testimonials';
import { SideScroller } from '~/components/MainQuotes/SideScroller';
import { TrustedBy } from '~/components/Main/TrustedBy';
import { CTA } from './CTA';
import { Features } from './Features';
import { Hero } from './Hero';
import { Numbers } from './Numbers';
import { WhatWeDo } from './WhatWeDo';
import { FAQ } from './FAQ';

const Main = async () => {
  return (
    <main>
      {/* @ts-expect-error Server Component */}
      <SideScroller />
      <Hero />
      <WhatWeDo />
      <TrustedBy />
      <Features />
      <Testimonials />
      <Numbers />
      <FAQ />
      <CTA />
    </main>
  );
};

export default Main;
