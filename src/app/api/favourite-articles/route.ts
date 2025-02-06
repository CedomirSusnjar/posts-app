import { openDb } from "../../../../db";
import { NextResponse } from "next/server";

export async function GET() {
    const db = await openDb();
    const favouritePosts = await db.all('SELECT rowid, * FROM favourites');
    
    return NextResponse.json(favouritePosts, {
      status: 200,
    });
};