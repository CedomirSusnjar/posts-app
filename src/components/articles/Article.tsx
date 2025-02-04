import Image from "next/image";

export type ArticleProps = {
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
}

export const Article = ({ author, title, description, url, urlToImage, publishedAt }: ArticleProps) => {
    return (
        <div className="flex flex-col w-2/4 p-4 bg-[#E1EACD]">
            <div className="flex">
                <div className="text-[28px] mb-4 flex-1">{title}</div>
                <div className="w-[20px] h-[20px] bg-[#8D77AB]" />
            </div>
            <div className="text-[12px]">{new Date(publishedAt).toDateString()} - {new Date(publishedAt).toLocaleTimeString()}</div>
            {author && <div className=" text-[12px] text-left">{author}</div>}
            <div className="mt-4 mb-4">
                {url.includes('www.foxsports.com') ? (
                    <Image width={600} height={200} src={urlToImage} alt='article image' />
                ) : null}
            </div>
            <div className="w-500 mb-4">{description}</div>
            <a href={url} target="_blank" className="w-1/5 text-[12px] underline">Click for more info</a>      
        </div>
    );
};