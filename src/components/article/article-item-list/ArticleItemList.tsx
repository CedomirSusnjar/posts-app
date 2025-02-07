import type { Article } from '@/types';
import { ArticleItem } from '../article-item/ArticleItem';

export type ArticleListProps = {
  items: Article[];
};

export const ArticleItemList = ({ items }: ArticleListProps) => {
  return (
    <div className="flex flex-wrap justify-start gap-5">
      {items.map((article: Article) => {
        return <ArticleItem key={`${article.title}${article.rowid}`} {...article} />;
      })}
    </div>
  );
};
