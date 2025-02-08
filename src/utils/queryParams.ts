import { SortDirection } from '@/enums';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const updateQueryParams = (
  path: string,
  newQueryParams: { [key: string]: string },
  searchParams: ReadonlyURLSearchParams,
) => {
  const newQuery = new URLSearchParams(searchParams.toString());
  Object.keys(newQueryParams).forEach((key: string) => {
    newQuery.set(key, newQueryParams[key] as string);
  });

  return `${process.env.NEXT_PUBLIC_DOMAIN}/${path}?${newQuery.toString()}`;
};

export const getSortDirection = (sortDirection: SortDirection) => {
  let tempDirection: SortDirection = SortDirection.ASC;
  if (sortDirection === SortDirection.ASC) {
    tempDirection = SortDirection.DESC;
  } else {
    tempDirection = SortDirection.ASC;
  }
  return tempDirection;
};
