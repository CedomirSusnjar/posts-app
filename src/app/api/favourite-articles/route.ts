import { addArticleToFavourites, getFavouriteArticles } from '@/db-service/favourite-articles';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const favouritePosts = await getFavouriteArticles();

  return NextResponse.json(favouritePosts, { status: 200 });
}

export async function POST(request: NextRequest) {
  const { article } = await request.json();
  const { title, author, urlToImage, source, publishedAt, description } = article;

  await addArticleToFavourites(title, author, urlToImage, source.name, publishedAt, description);
  const favouritePosts = await getFavouriteArticles();

  return NextResponse.json(favouritePosts, { status: 200 });
}
