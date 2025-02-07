import { SortDirection } from '@/enums';
import type { Article, CommonFilters, DbArticle } from '@/types';

export const filterPostResponse = (articles: Article[], filters: CommonFilters): Article[] => {
  const { searchTerm, author, sort, direction, publisher } = filters;
  let filteredArray = [...articles];

  if (searchTerm && searchTerm !== 'undefined') {
    filteredArray = articles.filter((article: Article) =>
      article.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase() ?? ''),
    );
  }

  if (author && author !== 'undefined') {
    filteredArray = filteredArray.filter((article: Article) => article.author === author);
  }

  if (publisher && publisher !== 'undefined') {
    filteredArray = filteredArray.filter((article: Article) => article.source.name === publisher);
  }

  if (sort !== 'undefined' && direction !== 'undefined') {
    if (direction === SortDirection.DESC) {
      filteredArray.sort((a: Article, b: Article) => {
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      });
    } else {
      filteredArray.sort((a: Article, b: Article) => {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });
    }
  }

  return filteredArray;
};

export const getArticlesPageProps = (
  articles: Article[],
  favouriteArticles: DbArticle[],
): { news: Article[]; authors: string[]; publishers: string[] } => {
  const responseWithFavourites = articles.map((article: Article) => {
    if (favouriteArticles.find((dbArticle: DbArticle) => dbArticle.title === article.title)) {
      return {
        ...article,
        publisher: article.source.name,
        isFavourite: true,
      };
    } else
      return {
        ...article,
        publisher: article.source.name,
      };
  });
  const authors = [...new Set(articles.map((post: Article) => post.author))];
  const publishers = [...new Set(articles.map((post: Article) => post.source.name))];

  return {
    news: responseWithFavourites,
    authors,
    publishers,
  };
};
