import { Page } from "@/components";
import { Article, ArticlesList } from "@/components/articles/ArticlesList";
import { getArticlesPageProps } from "@/utils/articles";
import { Filter } from "@/components/filter/Filter";

export type PostPageProps = {
    news: Article[];
    authors: string[];
    publishers: string[];
};

export const metadata = {
    title: 'Articles',
    description: 'This is a description of articles page',
    openGraph: {
        title: 'Articles',
        description: 'This is a description of articles page',
    },
    twitter: {
        card: 'summary_large_image'
    }
};

export default async function PostsPage() {
    const articles = await fetch(`http://localhost:3000/api/articles`).then(response => response.json());
    const favouriteArticles = await fetch('http://localhost:3000/api/favourite-articles').then(response => response.json());
    const { news, authors, publishers } = getArticlesPageProps(articles, favouriteArticles, {})

    const markAsFavouriteHandler = async (article: Article) => {
        'use server'
        try {
            await fetch(`/api/mark-article-favourite`, {
                method: 'POST',
                body: JSON.stringify({
                    article: article
                })
            });
        } catch(error: unknown) {
            console.error(error);
        }
    };

    return (
        <Page>
            <h1 className="text-[28px] mb-[3rem]">
                Here are your articles for today, enjoy...
            </h1>
            <h1 className="text-[28px] mb-[3rem]">
                Here are your articles for today, enjoy...
            </h1>
           <Filter authors={authors} publishers={publishers} />
            <ArticlesList markAsFavouriteHandler={markAsFavouriteHandler} news={news} />
        </Page>
    );
};