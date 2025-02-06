import { Page } from "@/components";
import { Article, ArticlesList } from "@/components/articles/ArticlesList";
import { DbArticle } from "@/types/dbArticle";
import Head from "next/head";

export type FavouritePostsPageProps = {
    articles: Article[];
};

export default function FavouritePostsPage({ articles }: FavouritePostsPageProps) {
    return (
        <Page>
            <Head>
                <title>Favourite articles</title>
                <meta name="description" content="This page is showing users favourite articles" />
                <meta property="og:title" content="Favourite articles" />
                <meta property="og:description" content="This page is showing users favourite articles" />
                <meta property="og:image" content="https://my-app.com/image.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <h1 className="text-[34px] text-left mb-10">
                Here are your favourite articles, enjoy!
            </h1>
            <ArticlesList news={articles} />
        </Page>
    );
};

export const getServerSideProps = async () => {
    const articles = await fetch('http://localhost:3000/api/favourite-articles').then(response => response.json());
    const favourites = articles.map((article: DbArticle) => {
        return {
            ...article,
            source: { id: null, name: article.name},
            isFavourite: true,
            id: article.rowid
        }
    });
    return {
        props: {
            articles: favourites
        }
        
    }
};