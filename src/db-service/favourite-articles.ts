import { openDb } from '../../db';

export const addArticleToFavourites = async (
  title: string,
  author: string,
  urlToImage: string,
  name: string,
  publishedAt: string,
  description: string,
) => {
  const db = await openDb();
  await db.run(
    'INSERT INTO favourites (title, author, urlToImage, name, publishedAt, description) VALUES (?, ?, ?, ?, ?, ?)',
    [title, author, urlToImage, name, publishedAt, description],
  );
};

export const getFavouriteArticles = async () => {
  const db = await openDb();
  return await db.all('SELECT rowid, * FROM favourites');
};
