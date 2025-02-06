/* eslint-disable @typescript-eslint/no-explicit-any */

import { openDb } from '../../../db';
export default async function handler(req: any, res: any) {
    console.log(req.body);
    const { article } = JSON.parse(req.body);
    console.log(article, 'article')
    const { title, author, urlToImage, source, publishedAt, description } = article;
    const { name } = source;
    const db = await openDb();
    await db.run('INSERT INTO favourites (title, author, urlToImage, name, publishedAt, description) VALUES (?, ?, ?, ?, ?, ?)', [title, author, urlToImage, name, publishedAt, description]);
    const favouritePosts = await db.all('SELECT * FROM favourites'); 
    res.status(200).json(favouritePosts);
};