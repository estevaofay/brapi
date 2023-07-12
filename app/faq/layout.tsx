interface QuotesQuoteLayoutProps {
  children: React.ReactNode;
}

export default async function QuotesQuoteLayout({
  children,
}: QuotesQuoteLayoutProps) {
  return <div className="bg-gray-900">{children}</div>;
}
