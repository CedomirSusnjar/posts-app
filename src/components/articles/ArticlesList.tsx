import { Article } from "./Article";

export type Article = {
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
    source: { id: string | null, name: string };
    isFavourite?: boolean;
    rowid?: string;
};

export type ArticleListProps = {
    news: Article[];
    markAsFavouriteHandler?: (article: Article) => void;
}

export const ArticlesList = ({ news, markAsFavouriteHandler }: ArticleListProps) => {
    return (
        <div className='flex flex-wrap justify-start gap-5'>
            {news.map((article: Article) => {
                return (
                    <Article key={article.title} markAsFavouriteHandler={markAsFavouriteHandler} {...article} />
                );
            })}
        </div>
    );
};