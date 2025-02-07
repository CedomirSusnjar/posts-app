import { ArticleFilters, ArticleItemList, Page } from '@/components';
import { ArticleListSkeleton } from '@/components/article/article-list-skeleton/ArticleListSkeleton';
import { fetchArticles } from '@/service/article-service';
import { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';

export const metadata = {
  title: 'Articles',
  description: 'This is a description of articles page',
  openGraph: {
    title: 'Articles',
    description: 'This is a description of articles page',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

const PageSkeleton = () => {
  return (
    <>
      <div className="flex w-[100%] gap-8 pb-5 mt-4rem">
        <Skeleton width={100} height={34} />
        <Skeleton width={100} height={34} />
        <Skeleton width={100} height={34} />
      </div>
      <ArticleListSkeleton />
    </>
  );
};

interface PageProps {
  searchParams: {
    query?: string;
  };
}

const DataFetchComponent = async ({ searchParams }: PageProps) => {
  const { news, authors, publishers } = await fetchArticles(await searchParams);

  return (
    <>
      <ArticleFilters authors={authors} publishers={publishers} />
      <ArticleItemList items={news} />
    </>
  );
};

export default async function PostsPage({ searchParams }: PageProps) {
  return (
    <Page>
      <h1 className="text-3xl mb-[3rem]">Here are your articles for today, enjoy...</h1>
      <Suspense fallback={<PageSkeleton />}>
        <DataFetchComponent searchParams={searchParams} />
      </Suspense>
    </Page>
  );
}
