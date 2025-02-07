import { ArticleItemList, Page } from '@/components';
import { ArticleListSkeleton } from '@/components/article/article-list-skeleton/ArticleListSkeleton';
import { fetchFavouriteArticles } from '@/service/article-service';
import type { DbArticle, Article } from '@/types';
import { Suspense } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';

export type FavouritePostsPageProps = {
  articles: Article[];
};

export const metadata = {
  title: 'Favourite articles',
  description: 'This page is showing users favourite articles',
  openGraph: {
    title: 'Favourite articles',
    description: 'This page is showing users favourite articles',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

const DataFetchComponent = async () => {
  const articles = await fetchFavouriteArticles();
  const favourites = extendFavouriteArticles(articles);

  return <ArticleItemList items={favourites} />;
  // return <ArticleListSkeleton />;
};

export default async function FavouritePostsPage() {
  return (
    <Page>
      <h1 className="text-3xl text-left mb-10">Here are your favourite articles, enjoy!</h1>
      <Suspense fallback={<ArticleListSkeleton />}>
        <DataFetchComponent />
      </Suspense>
    </Page>
  );
}

const extendFavouriteArticles = (articles: DbArticle[]): Article[] => {
  return articles.map((article: DbArticle) => {
    return {
      ...article,
      source: { id: null, name: article.name },
      isFavourite: true,
      id: article.rowid,
      url: '',
      content: '',
    };
  });
};
