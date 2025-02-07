import type { Article, ArticlesContent, DbArticle } from '@/types';

export const fetchArticles = async (searchParams: { [key: string]: string }): Promise<ArticlesContent> => {
  const params = new URLSearchParams(searchParams).toString();
  const { news, authors, publishers } = await fetch(`http://localhost:3000/api/articles?${params}`).then((response) =>
    response.json(),
  );

  return { news, authors, publishers };
};

export const fetchFavouriteArticles = async (): Promise<DbArticle[]> => {
  return await fetch('http://localhost:3000/api/favourite-articles').then((response) => response.json());
};

export const setArticleFavourite = async (article: Article): Promise<void> => {
  await fetch(`http://localhost:3000/api/favourite-articles`, {
    method: 'POST',
    body: JSON.stringify({
      article: article,
    }),
  });
};
