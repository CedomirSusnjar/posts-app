/* eslint-disable @typescript-eslint/no-explicit-any */
import { Article } from "@/types";


export const fetchArticles = async (params: any) => {
    const { news, authors, publishers } = 
        await fetch(`http://localhost:3000/api/articles?searchTerm=${params.searchTerm}&author=${params.author}&publisher=${params.publisher}&sort=${params.sort}&direction=${params.direction}`).then(response => response.json());
    
    return { news, authors, publishers };
};

export const fetchFavouriteArticles = async () => {
    return await fetch('http://localhost:3000/api/favourite-articles').then(response => response.json());
};

export const setArticleFavourite = async (article: Article) => {
    await fetch(`http://localhost:3000/api/favourite-articles`, {
            method: 'POST',
            body: JSON.stringify({
            article: article
        })
    });
};