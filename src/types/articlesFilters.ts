export type ArticlesFilters = {
    searchTerm: string;
    author: string;
    sort: string;
    direction: 'asc' | 'desc' | 'undefined';
    publisher: string;
};