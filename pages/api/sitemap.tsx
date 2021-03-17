import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).setHeader('Content-Type', 'application/xml');
  res.send(`<?xml version="1.0" encoding="utf-8" standalone="yes" ?>
  <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://brapi.ga/</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>monthly</changefreq>
      <priority>1</priority>
    </url>
    <url>
      <loc>https://brapi.ga/about</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>https://brapi.ga/quotes</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>https://brapi.ga/docs</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>https://brapi.ga/contact</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>https://brapi.ga/login</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>https://brapi.ga/create-account</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>https://brapi.ga/legal</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>https://brapi.ga/quotes/OIBR3</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://brapi.ga/quotes/CIEL3</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://brapi.ga/quotes/IRBR3</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://brapi.ga/quotes/GFSA3</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://brapi.ga/quotes/COGN3</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://brapi.ga/quotes/PETR3</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://brapi.ga/quotes/VVAR3</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://brapi.ga/quotes/VALE3</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://brapi.ga/quotes/MGLU3</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://brapi.ga/quotes/CSNA3</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://brapi.ga/quotes/DMMO3</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://brapi.ga/quotes/BBAS3</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://brapi.ga/quotes/BRDT3</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://brapi.ga/quotes/ABEV3</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://brapi.ga/quotes/BRML3</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://brapi.ga/quotes/INTB3</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://brapi.ga/quotes/JHSF3</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://brapi.ga/quotes/MRFG3</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://brapi.ga/quotes/RAIL3</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://brapi.ga/quotes/PRIO3</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
  </urlset>`);
};
