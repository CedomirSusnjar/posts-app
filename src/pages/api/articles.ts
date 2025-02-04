import { filterPostResponse } from "@/utils/articles";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function handler(req: any, res: any) {
    const news = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=5466550fed754acc881cffa1c0c6a2bd').then(response => response.json());
    res.status(200).json(filterPostResponse(news.articles, req.query));
}