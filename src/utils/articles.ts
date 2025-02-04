/* eslint-disable @typescript-eslint/no-explicit-any */

import { Article } from "@/components/articles/ArticlesList";

export const filterPostResponse = (articles: Article[], filters: any) => {
    console.log(filters);
    const { searchTerm, author, sort, direction } = filters;
    let filteredArray = [...articles];
    if(searchTerm !== 'undefined') {
        filteredArray = articles.filter((article: Article) => article.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase() ?? ''));
    }
    if(author !== 'undefined') {
        filteredArray = filteredArray.filter((article: Article) => article.author === author);
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