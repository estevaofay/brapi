import NextLink from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { read } from 'gray-matter';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();

const allFAQPaths = path.join(rootDir, 'app', 'faq', '[content]');
const allFAQFiles = fs.readdirSync(allFAQPaths);

const allFAQs = allFAQFiles.map((file) => {
  if (!file.endsWith('.mdx')) {
    return null;
  }

  const filePath = path.join(allFAQPaths, file);
  const fileContents = read(filePath);

  return {
    ...fileContents,
    slug: file.replace('.mdx', ''),
  };
});

export default function FAQPage() {
  return (
    <main>
      <section className="max-w-screen min-h-screen">
        <div className="container mx-auto flex flex-col px-5 py-0 md:py-8 prose prose-lg">
          {allFAQs.map((faq, index) => {
            if (!faq) {
              return null;
            }

            console.log({ faq });
            // excerpt is the first 150 characters complete words
            const excerpt =
              faq?.content?.substring(0, 150).replace(/\s+\S*$/, '') + '...';

            return (
              <div key={index}>
                <h2 className="text-2xl font-bold mb-1">{faq?.data?.title}</h2>

                {/* @ts-expect-error Server Component */}
                <MDXRemote
                  source={excerpt}
                  components={{
                    p: (props) => <p {...props} className="mb-0" />,
                  }}
                />
                <NextLink
                  href={`/faq/${faq.slug}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Ler mais
                </NextLink>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
