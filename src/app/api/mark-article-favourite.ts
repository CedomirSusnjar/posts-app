import { NextApiRequest, NextApiResponse } from 'next';
import { openDb } from '../../../db';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { article } = JSON.parse(req.body);
    const { title, author, urlToImage, source, publishedAt, description } = article;
    const { name } = source;
    const db = await openDb();
    await db.run('INSERT INTO favourites (title, author, urlToImage, name, publishedAt, description) VALUES (?, ?, ?, ?, ?, ?)', [title, author, urlToImage, name, publishedAt, description]);
    const favouritePosts = await db.all('SELECT * FROM favourites'); 
    res.status(200).json(favouritePosts);
};