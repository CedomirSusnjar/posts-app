'use client';

import Image from 'next/image';
import starEmptyIcon from '../../../assets/star-empty.png';
import starIcon from '../../../assets/star.png';
import { useState } from 'react';
import { setArticleFavourite } from '@/service/article-service';
import type { Article } from '@/types';
import { useRouter } from 'next/navigation';
import slugify from 'slugify';

export type ArticleProps = {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  isFavourite?: boolean;
  source: { id: null | string; name: string };
  rowid?: string;
};

export const ArticleItem = ({
  rowid,
  source,
  author,
  title,
  description,
  url,
  urlToImage,
  publishedAt,
  content,
  isFavourite,
}: ArticleProps) => {
  const router = useRouter();

  const article = {
    rowid,
    source,
    author,
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    content,
    isFavourite,
  };
  const [favourite, setFavourite] = useState<boolean>(isFavourite ?? false);

  const handleFavouriteClick = (event: any) => {
    if (favourite) {
      // setFavourite(false); can be implemented to remove favourite mark on click
    } else {
      markAsFavouriteHandler?.(event, article);
      setFavourite(true);
    }
  };

  const markAsFavouriteHandler = async (event: any, article: Article) => {
    event.stopPropagation();
    try {
      await setArticleFavourite(article);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const handleArticleClick = () => {
    router.push(`http://localhost:3000/favourite-articles/${slugify(title)}`);
  };

  return (
    <article
      onClick={handleArticleClick}
      className="flex flex-col w-[450px] p-4 h-[600px] bg-white border-2 relative rounded-[6px]"
    >
      <div className="flex">
        <div className="text-2xl mb-4 flex-1 h-[130px] overflow-hidden text-ellipsis line-clamp-2 ">{title}</div>
        <button title="Mark as favourite" className="w-[20px] h-[20px]" onClick={handleFavouriteClick}>
          <Image src={favourite ? starIcon : starEmptyIcon} alt="" />
        </button>
      </div>
      <div className="text-xs">
        {new Date(publishedAt).toDateString()} - {new Date(publishedAt).toLocaleTimeString()}
      </div>
      {author && <div className="text-xs text-left">{author}</div>}
      {source.name && <div className=" text-xs text-left">{source.name}</div>}
      <div className="mt-4 mb-4">
        {urlToImage ? (
          <Image width={600} height={200} className="max-h-[200]" src={urlToImage} alt="article image" />
        ) : (
          <div>Image is not available</div>
        )}
      </div>
      <div className="w-500 mb-4 max-h-[150px] overflow-hidden text-ellipsis line-clamp-4">{description}</div>
      <a href={url} target="_blank" className="absolute bottom-4 text-xs underline">
        Click for more info
      </a>
    </article>
  );
};
