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
  params: { id: string };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const { id } = params;

  return (
    <Page>
      <h1>This is single article Page. Just as example title is shown.</h1>
      <br />
      <h1>{id.replaceAll('-', ' ')}</h1>
    </Page>
  );
}
