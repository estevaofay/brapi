import NextLink from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import * as matter from 'gray-matter';
import path from 'path';

const rootDir = process.cwd();

const allFAQPaths = path.join(rootDir, 'app', 'faq', '[content]');

export default function FAQContentPage({
  params,
}: {
  params: { content: string };
}) {
  const file = `${params.content}.mdx`;
  const filePath = path.join(allFAQPaths, file);
  const fileContents = matter.read(filePath);

  return (
    <main>
      <section className="max-w-screen min-h-screen">
        <div className="container mx-auto flex flex-col px-5 py-0 md:py-8 prose prose-lg">
          <div>
            <NextLink
              href={`/faq`}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Voltar
            </NextLink>
            <h2 className="text-2xl font-bold mb-1">
              {fileContents?.data?.title}
            </h2>

            {/* @ts-expect-error Server Component */}
            <MDXRemote
              source={fileContents.content}
              components={{
                p: (props) => <p {...props} className="mb-0" />,
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
