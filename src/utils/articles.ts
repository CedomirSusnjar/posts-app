/* eslint-disable @typescript-eslint/no-explicit-any */

import { Article } from "@/components/articles/ArticlesList";

export const filterPostResponse = (articles: Article[], filters: any) => {
    const { searchTerm, author, sort, direction, publisher } = filters;
    let filteredArray = [...articles];
    if(searchTerm && searchTerm !== 'undefined') {
        console.log(searchTerm, 'uslo')
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