import { Page } from "@/components";
import { Article, ArticlesList } from "@/components/articles/ArticlesList";
import { DbArticle } from "@/types/dbArticle";

export type FavouritePostsPageProps = {
    articles: Article[];
};

export const metadata = {
    title: 'Favourite articles',
    description: 'This page is showing users favourite articles',
    openGraph: {
        title: 'Favourite articles',
        description: 'This page is showing users favourite articles',
        image: 'https://my-app.com/image.jpg'
    },
    twitter: {
        card: 'summary_large_image'
    }
};

export default function FavouritePostsPage({ articles }: FavouritePostsPageProps) {
    return (
        <Page>
            <h1 className="text-[34px] text-left mb-10">
                Here are your favourite articles, enjoy!
            </h1>
            <ArticlesList news={articles} />
        </Page>
    );
};

// export const getServerSideProps = async () => {
//     const articles = await fetch('http://localhost:3000/api/favourite-articles').then(response => response.json());
//     const favourites = articles.map((article: DbArticle) => {
//         return {
//             ...article,
//             source: { id: null, name: article.name},
//             isFavourite: true,
//             id: article.rowid
//         }
//     });
//     return {
//         props: {
//             articles: favourites
//         }
        
//     }
// };