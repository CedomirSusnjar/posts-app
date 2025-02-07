import { Page } from "@/components";
import { ArticleList } from "@/components/articles/ArticleList";
import { fetchFavouriteArticles } from "@/service/article-service";
import { Article } from "@/types";
import { DbArticle } from "@/types/DbArticle";

export type FavouritePostsPageProps = {
    articles: Article[];
};

export const metadata = {
    title: 'Favourite articles',
    description: 'This page is showing users favourite articles',
    openGraph: {
        title: 'Favourite articles',
        description: 'This page is showing users favourite articles',
    },
    twitter: {
        card: 'summary_large_image'
    }
};

export default async function FavouritePostsPage() {

    const articles = await fetchFavouriteArticles();
    const favourites = extendFavouriteArticles(articles);

    return (
        <Page>
            <h1 className="text-[34px] text-left mb-10">
                Here are your favourite articles, enjoy!
            </h1>
            <ArticleList items={favourites} />
        </Page>
    );
};

const extendFavouriteArticles = (articles: DbArticle[]): Article[] => {
    return articles.map((article: DbArticle) => {
        return {
            ...article,
            source: { id: null, name: article.name},
            isFavourite: true,
            id: article.rowid,
            url: '',
            content: ''
        }
    });
};