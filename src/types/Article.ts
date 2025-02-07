export type Article = {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  source: { id: string | null; name: string };
  isFavourite?: boolean;
  rowid?: string;
};
