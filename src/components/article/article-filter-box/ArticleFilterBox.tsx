import { ReactNode } from 'react';

type ArticleFilterBoxProps = {
  children: ReactNode;
  title: string;
};

export const ArticleFilterBox = ({ children, title }: ArticleFilterBoxProps) => {
  return (
    <div className="flex flex-col">
      <div className="text-s">{title}</div>
      <div className="flex gap-2">{children}</div>
    </div>
  );
};
