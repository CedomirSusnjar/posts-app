import type { Article, ArticlesContent, DbArticle } from '@/types';

export const fetchArticles = async (searchParams: { [key: string]: string }): Promise<ArticlesContent> => {
  const params = new URLSearchParams(searchParams).toString();
  const { news, authors, publishers } = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles?${params}`).then(
    (response) => response.json(),
  );

  return { news, authors, publishers };
};

export const fetchFavouriteArticles = async (): Promise<DbArticle[]> => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourite-articles`).then((response) => response.json());
};

export const addArticleToFavourites = async (article: Article): Promise<void> => {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourite-articles`, {
    method: 'POST',
    body: JSON.stringify({
      article: article,
    }),
  });
};
