'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { BounceLoader } from 'react-spinners';
import searchIcon from '../../../assets/search.png';
import deleteIcon from '../../../assets/delete.png';
import sortDownIcon from '../../../assets/sort-down.png';
import sortUpIcon from '../../../assets/sort-up.png';
import calendarIcon from '../../../assets/calendar.png';
import { getSortDirection, updateQueryParams } from '@/utils/queryParams';
import { Select, IconButton, Input } from '@/components/common-ui';
import type { SortDirection } from '@/types';
import { Filters, SortDirection as SortDirectionEnum } from '@/enums';
import { ArticleFilterBox } from './article-filter-box/ArticleFilterBox';
import { useApp } from '@/context/AppContext';

type ArticleFiltersProps = {
  authors: string[];
  publishers: string[];
};

export const ArticleFilters = ({ authors, publishers }: ArticleFiltersProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const { favouritePostsNumber } = useApp();

  const [searchTerm, setSearchTerm] = useState<string>((searchParams.get(Filters.SEARCH_TERM) as string) ?? '');
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirectionEnum.ASC);

  useEffect(() => {
    setLoading(false);
  }, [authors]);

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    router.push(updateQueryParams('/articles', { searchTerm: searchTerm }, searchParams));
  };

  const handleSelectAuthor = (event: ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);
    router.push(updateQueryParams('/articles', { author: event.target.value }, searchParams));
  };

  const handleSelectPublisher = (event: ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);
    router.push(updateQueryParams('/articles', { publisher: event.target.value }, searchParams));
  };

  const handleSort = () => {
    setLoading(true);
    const tempDirection = getSortDirection(sortDirection);
    setSortDirection(tempDirection);
    const sortObj = {
      sort: 'date',
      direction: tempDirection,
    };
    router.push(updateQueryParams('/articles', sortObj, searchParams));
  };

  const removeFilter = (filterName: string) => {
    setLoading(true);
    const url = new URL(window.location.href);
    url.searchParams.delete(filterName);
    router.push(`${process.env.NEXT_PUBLIC_DOMAIN}/articles/${url.search}`);
  };

  return (
    <div className="flex lg:flex-row w-[100%] sm:h-[100%] lg:gap-8 sm:gap-2 pb-5 md:flex-col sm:flex-col ">
      <ArticleFilterBox title="Search by title">
        <Input onChange={handleSearchTermChange} value={searchTerm as string} />
        <IconButton title="Search by title" onClick={handleSearch} icon={searchIcon} />
      </ArticleFilterBox>
      <ArticleFilterBox title="Filter by author">
        <Select
          defaultValue={searchParams.get(Filters.AUTHOR) as string}
          onChange={handleSelectAuthor}
          options={authors}
        />
        {searchParams.get(Filters.AUTHOR) && (
          <IconButton title="Clear author filter" onClick={() => removeFilter(Filters.AUTHOR)} icon={deleteIcon} />
        )}
      </ArticleFilterBox>
      <ArticleFilterBox title="Filter by publisher">
        <Select
          defaultValue={searchParams.get(Filters.PUBLISHER) as string}
          onChange={handleSelectPublisher}
          options={publishers}
        />
        {searchParams.get(Filters.PUBLISHER) && (
          <IconButton
            title="Clear publisher filter"
            onClick={() => removeFilter(Filters.PUBLISHER)}
            icon={deleteIcon}
          />
        )}
      </ArticleFilterBox>
      <div className="flex flex-col sm:w-[max-content] lg:w-[auto]">
        <div className="h-[22px]">Sort by date</div>
        <div className="flex border-[1px] rounded-[8px] border-slate-200 pl-2 pr-2 pt-1 pb-1">
          <IconButton className="h-[24px] w-[32px]" title="Sort by date" onClick={handleSort} icon={calendarIcon} />
          <IconButton
            className="h-[24px]"
            title="Sort by date"
            onClick={handleSort}
            icon={searchParams.get(Filters.DIRECTION) === SortDirectionEnum.DESC ? sortDownIcon : sortUpIcon}
          />
        </div>
      </div>
      <div className="flex lg:flex-col sm:flex-row sm:gap-4 lg:gap-2 w-[max-content]">
        <div>Favourite posts on page</div>
        <div className="text-right font-bold">{favouritePostsNumber}</div>
      </div>
      <div>
        <div className="h-[20px]"></div>
        {loading && <BounceLoader size={32} color="#8D77AB" />}
      </div>
    </div>
  );
};
