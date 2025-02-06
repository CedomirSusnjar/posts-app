import { CommonFilters } from "@/types/CommonFilters";
import { filterPostResponse } from "@/utils/articles";
import { NextResponse } from "next/server";

export async function GET() {
    const news = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=5466550fed754acc881cffa1c0c6a2bd')
        .then(response => response.json());
        console.log(news);
        return NextResponse.json(filterPostResponse(news.articles, {} as CommonFilters), {
    status: 200,
  });
};