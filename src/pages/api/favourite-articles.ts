import { NextApiRequest, NextApiResponse } from "next";
import { openDb } from "../../../db";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
    const db = await openDb();
    const favouritePosts = await db.all('SELECT rowid, * FROM favourites');
    res.status(200).json(favouritePosts);
};