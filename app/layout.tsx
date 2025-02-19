import { Metadata } from 'next';
import Script from 'next/script';
import { Analytics } from '~/components/Analytics';
import { AutoToast } from '~/components/AutoToast';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import { GA_TRACKING_ID } from '~/utils/gtag';
import { createOg } from '~/utils/og';
import '~/styles/global.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    default: 'brapi',
    template: '%s | brapi',
    absolute: 'brapi - API de ações da bolsa de valores brasileira',
  },
  description:
    'API ilimitada da BOVESPA e Cryptomoedas. Ajudamos desenvolvedores a construir o futuro das fintechs democratizando o acesso aos dados do mercado financeiro brasileiro.',
  openGraph: {
    ...createOg('API de ações da bolsa de valores brasileira'),
    title: 'brapi - API de ações da bolsa de valores brasileira',
    description:
      'API ilimitada da BOVESPA e Cryptomoedas. Ajudamos desenvolvedores a construir o futuro das fintechs democratizando o acesso aos dados do mercado financeiro brasileiro.',
    type: 'website',
    siteName: 'brapi',
    url: 'https://brapi.dev',
  },
  applicationName: 'brapi',
  twitter: {
    card: 'summary_large_image',
    title: 'brapi',
  },
  viewport: 'width=device-width, initial-scale=1',
};

const clarityCode = `
(function (c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "i08gpgdcs7");`;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <head>
        <Script
          id="ga"
          async
          defer
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          id="ga-init"
          async
          defer
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
          `,
          }}
        />
        <Script id="ms-clarity" strategy="beforeInteractive">
          {clarityCode}
        </Script>

        <Script
          id="tally"
          async
          defer
          src="https://tally.so/widgets/embed.js"
          strategy="beforeInteractive"
        />
      </head>

      <body className="bg-gray-900">
        {/* @ts-expect-error Server Component */}
        <Header />
        {children}
        <Analytics />
        <AutoToast />
        <Footer />
      </body>
    </html>
  );
}
