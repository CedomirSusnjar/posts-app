import { Article } from "@/components/articles/ArticlesList";
import { ArticlesFilters } from "@/types/articlesFilters";

export const filterPostResponse = (articles: Article[], filters: ArticlesFilters) => {
    const { searchTerm, author, sort, direction, publisher } = filters;
    let filteredArray = [...articles];
    if(searchTerm && searchTerm !== 'undefined') {
        filteredArray = articles.filter((article: Article) => article.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase() ?? ''));
    }
    if(author && author !== 'undefined') {
        filteredArray = filteredArray.filter((article: Article) => article.author === author);
    }
    if(publisher && publisher !== 'undefined') {
        filteredArray = filteredArray.filter((article: Article) => article.source.name === publisher);
    }
    if(sort !== 'undefined' && direction !== 'undefined') {
        if(direction === 'asc') {
            filteredArray.sort((a: Article, b: Article) => {
                return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
            });
        } else {
            filteredArray.sort((a: Article, b: Article) => {
                return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        })
        }
    }
    return filteredArray;
};

export const getArticlesPageProps = (articles: Article[], favouriteArticles: Article[], queryParams: ArticlesFilters) => {
    const responseWithFavourites = articles.map((article: Article) => {
        if(favouriteArticles.find((articleF: Article) => articleF.title === article.title)) {
            return {
                ...article,
                publisher: article.source.name,
                isFavourite: true
            } 
        } else return {
                ...article,
                publisher: article.source.name,
        }
    })
    const authors = [...new Set(articles.map((post: Article) => post.author))];
    const publishers = [...new Set(articles.map((post: Article) => post.source.name))];

    return {
        news: filterPostResponse(responseWithFavourites, queryParams),
        authors,
        publishers
    }
};