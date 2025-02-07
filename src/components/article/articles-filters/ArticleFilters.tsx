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

type ArticleFiltersProps = {
  authors: string[];
  publishers: string[];
};

export const ArticleFilters = ({ authors, publishers }: ArticleFiltersProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();

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
    router.push(`http://localhost:3000/articles/${url.search}`);
  };

  return (
    <div className="flex w-[100%] gap-8 pb-5">
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
      <div className="flex flex-col">
        <div className="h-[22px]"></div>
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
      <div>
        <div className="h-[20px]"></div>
        {loading && <BounceLoader size={32} color="#8D77AB" />}
      </div>
    </div>
  );
};
