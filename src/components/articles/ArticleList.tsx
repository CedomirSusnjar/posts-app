import { Article } from "@/types";
import { ArticleItem } from "./ArticleItem";

export type ArticleListProps = {
    items: Article[];
}

export const ArticleList = ({ items }: ArticleListProps) => {
    return (
        <div className='flex flex-wrap justify-start gap-5'>
            {items.map((article: Article) => {
                return (
                    <ArticleItem key={article.title} {...article} />
                );
            })}
        </div>
    );
};