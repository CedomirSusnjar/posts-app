import Skeleton from 'react-loading-skeleton';

export const ArticleListSkeleton = () => {
  const array = Array.from({ length: 10 });
  return (
    <div className="flex flex-wrap gap-5">
      {array.map(() => {
        return <Skeleton key={Math.random()} width={450} height={600} />;
      })}
    </div>
  );
};
