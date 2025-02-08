import { Direction } from '@/enums';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const createQueryString = (
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

export const getSortDirection = (sortDirection: Direction) => {
  let tempDirection: Direction = Direction.ASC;
  if (sortDirection === Direction.ASC) {
    tempDirection = Direction.DESC;
  } else {
    tempDirection = Direction.ASC;
  }
  return tempDirection;
};
