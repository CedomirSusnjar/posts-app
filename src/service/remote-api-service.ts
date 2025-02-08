import type { Article } from '@/types';

export const fetchNewsRemoteApi = async (): Promise<{
  articles: Article[];
}> => {
  return await fetch(`${process.env.FETCH_API}?country=us&apiKey=${process.env.API_KEY}`).then((response) =>
    response.json(),
  );
};
