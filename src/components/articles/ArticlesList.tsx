import { Article } from "./Article";

export type Article = {
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const ArticlesList = ({ news }: any) => {
    return (
        <div className='flex flex-col gap-4 items-center'>
            {news.map((article: Article) => {
                return (
                    <Article key={article.title} {...article} />
                );
            })}
        </div>
    );
};