import { Article } from './article';

export type ArticlesContent = {
  news: Article[];
  authors: string[];
  publishers: string[];
};
