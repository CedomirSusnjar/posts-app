'use client';

import type { Article } from '@/types';
import { ArticleItem } from '../article-item/ArticleItem';
import { useApp } from '@/context/AppContext';
import { useEffect } from 'react';

export type ArticleListProps = {
  items: Article[];
};

export const ArticleItemList = ({ items }: ArticleListProps) => {
  const { setFavouritePostsNumberHandler } = useApp();

  useEffect(() => {
    setFavouritePostsNumberHandler(items.filter((item: Article) => item.isFavourite).length);
  }, [items, setFavouritePostsNumberHandler]);

  return (
    <div className="flex flex-wrap justify-start gap-5">
      {items.map((article: Article) => {
        return <ArticleItem key={`${article.title}${article.rowid}`} {...article} />;
      })}
    </div>
  );
};
