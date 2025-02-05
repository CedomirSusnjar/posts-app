/* eslint-disable @typescript-eslint/no-explicit-any */
import { openDb } from "../../../db";

export default async function handler(req: any, res: any) {
    const db = await openDb();
    const favouritePosts = await db.all('SELECT * FROM favourites');
    res.status(200).json(favouritePosts);
};