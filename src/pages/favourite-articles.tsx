/* eslint-disable @typescript-eslint/no-explicit-any */
import { Article, ArticlesList } from "@/components/articles/ArticlesList";
import { Header } from "@/components/header";
import Head from "next/head";

export default function FavouritePostsPage({ articles }: any) {
    return (
        <div className='flex flex-col bg-[#fff] pt-[100px]'>
            <Head>
                <title>Favourite articles</title>
                <meta name="description" content="This page is showing users favourite articles" />
                <meta property="og:title" content="Favourite articles" />
                <meta property="og:description" content="This page is showing users favourite articles" />
                <meta property="og:image" content="https://my-app.com/image.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <Header />
            <div className="flex flex-col p-4">
                <h1 className="text-[34px] text-left mb-10">
                    Here are your favourite articles, enjoy!
                </h1>
                <ArticlesList news={articles} />
            </div>
            
        </div>
    );
};

export const getServerSideProps = async () => {
    const response = await fetch('http://localhost:3000/api/favourite-articles');
    const articles = await response.json();
    const favourites = articles.map((article: Article) => {
        return {
            ...article,
            isFavourite: true
        }
    });
    return {
        props: {
            articles: favourites
        }
        
    }
};