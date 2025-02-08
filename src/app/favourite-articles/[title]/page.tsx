import { Page } from '@/components';

export const metadata = {
  title: 'Article',
  description: 'This is a description of single article page',
  openGraph: {
    title: 'Articles',
    description: 'This is a description of single article page',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

interface ArticlePageProps {
  params: { title: string };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { title } = await params;

  return (
    <Page>
      <h1>This is single article Page. Just as example title is shown.</h1>
      <br />
      <h1>{title.replaceAll('-', ' ')}</h1>
    </Page>
  );
}
