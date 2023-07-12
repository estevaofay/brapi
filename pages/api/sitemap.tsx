import { NextApiRequest, NextApiResponse } from 'next';
import { getQuoteList } from '~/services/getQuoteList';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();

const allFAQPaths = path.join(rootDir, 'content');
const allFAQFiles = fs.readdirSync(allFAQPaths);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const stockList = await getQuoteList({ limit: 5000 });

  res.status(200).setHeader('Content-Type', 'application/xml');
  res.send(`<?xml version="1.0" encoding="utf-8" standalone="yes" ?>
  <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://brapi.dev/</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>1</priority>
    </url>
    <url>
      <loc>https://brapi.dev/about</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>https://brapi.dev/docs</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>https://brapi.dev/contact</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>https://brapi.dev/terms-of-use</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>https://brapi.dev/privacy-policy</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>https://brapi.dev/cookie-policy</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>https://brapi.dev/faq</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.9</priority>
    </url>
    ${allFAQFiles
      .map((file) => {
        if (!file.endsWith('.mdx')) {
          return null;
        }

        const slug = file.replace('.mdx', '');
        const url = `https://brapi.dev/faq/${slug}`;

        return `
        <url>
          <loc>${url}</loc>
          <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>
      `;
      })
      .join('\n')}
    ${stockList
      .map(
        (stock) => `
      <url>
        <loc>https://brapi.dev/quote/${stock.stock}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
    `,
      )
      .join('\n')}
  </urlset>`);
};
