import { Page } from "@/components";
import { Article, ArticleList } from "@/components/articles/ArticleList";
import { Filter } from "@/components/filter/Filter";
import { fetchArticles } from "@/service/article-service";

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

interface PageProps {
    searchParams: {
        query?: string;
    };
};

export default async function PostsPage({ searchParams }: PageProps) {
    const { news, authors, publishers } = await fetchArticles(await searchParams);

    return (
        <Page>
            <h1 className="text-[28px] mb-[3rem]">
                Here are your articles for today, enjoy...
            </h1>
            <Filter authors={authors} publishers={publishers} />
            <ArticleList items={news} />
        </Page>
    );
};