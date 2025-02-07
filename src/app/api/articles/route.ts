import { fetchFavouriteArticles } from '@/service/article-service';
import { fetchNewsRemoteApi } from '@/service/remote-api-service';
import { filterPostResponse, getArticlesPageProps } from '@/utils/articles';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const paramsObj = parseRequestParams(request);

  const response = await fetchNewsRemoteApi();
  const favouriteArticles = await fetchFavouriteArticles();
  const { news, authors, publishers } = getArticlesPageProps(response.articles, favouriteArticles);

  const obj = {
    news: filterPostResponse(news, paramsObj),
    authors: authors,
    publishers: publishers,
  };

  return NextResponse.json(obj, { status: 200 });
}

const parseRequestParams = (request: NextRequest) => {
  const url = new URL(request.url);
  const paramsObj: { [key: string]: string } = {};

  url.searchParams.forEach((value: string, key: string) => {
    paramsObj[key] = value;
  });

  return paramsObj;
};
