import Image from "next/image";
import { Article as ArticleType } from "./ArticlesList";
import starEmptyIcon from '../../assets/star-empty.png';
import starIcon from '../../assets/star.png';
import { useState } from "react";

export type ArticleProps = {
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
    isFavourite?: boolean;
    markAsFavouriteHandler: (value: ArticleType) => void;
}

export const Article = ({ author, title, description, url, urlToImage, publishedAt, content, markAsFavouriteHandler, isFavourite }: ArticleProps) => {
    const  article = { author, title, description, url, urlToImage, publishedAt, content, isFavourite };
    const [favourite, setFavourite] = useState<boolean>(isFavourite ?? false);
    console.log(isFavourite);
    const handleFavouriteClick = () => {
        if(favourite) {
            setFavourite(false);
        } else { 
            markAsFavouriteHandler(article);
            setFavourite(true);
        }
    };

    return (
        <div className="flex flex-col w-[450px] p-4 h-[600px] bg-[#fff] border-2 relative rounded-[6px]">
            <div className="flex">
                <div className="text-[28px] mb-4 flex-1 h-[130px] overflow-hidden text-ellipsis line-clamp-3">{title}</div>
                <button title="Mark as favourite" className="w-[20px] h-[20px]" onClick={handleFavouriteClick}>
                    <Image src={favourite ? starIcon : starEmptyIcon} alt="" />
                </button>
            </div>
            <div className="text-[12px]">{new Date(publishedAt).toDateString()} - {new Date(publishedAt).toLocaleTimeString()}</div>
            {author && <div className=" text-[12px] text-left">{author}</div>}
            <div className="mt-4 mb-4">
                <Image width={600} height={200} className="max-h-[200]" src={urlToImage} alt='article image' />
            </div>
            <div className="w-500 mb-4 max-h-[150px]">{description}</div>
            <a href={url} target="_blank" className="absolute bottom-4 text-[12px] underline">Click for more info</a>      
        </div>
    );
};