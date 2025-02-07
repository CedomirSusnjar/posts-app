/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { Input, Select } from "../common-ui";
import { IconButton } from "../common-ui/button/IconButton";
import { BounceLoader } from "react-spinners";
import searchIcon from '../../assets/search.png';
import deleteIcon from '../../assets/delete.png';
import sortDownIcon from '../../assets/sort-down.png';
import sortUpIcon from '../../assets/sort-up.png';
import calendarIcon from '../../assets/calendar.png';
import { SortDirection } from "@/types";
import { getSortDirection, updateQueryParams } from "@/utils/queryParams";

export const Filter = ({ authors, publishers }: any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('searchTerm') as string ?? '');
    const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.ASC);

    const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    };

    const handleSearch = async () => {
        setLoading(true);
        router.push(updateQueryParams('/articles', { 'searchTerm': searchTerm }, searchParams));
    };

    const handleSelectAuthor = (event: ChangeEvent<HTMLSelectElement>) => {
        setLoading(true);
        router.push(updateQueryParams('/articles', { 'author': event.target.value }, searchParams));
    };

     const handleSelectPublisher = (event: ChangeEvent<HTMLSelectElement>) => {
        setLoading(true);
        router.push(updateQueryParams('/articles', { 'publisher': event.target.value }, searchParams));
    };

    const handleSort = () => {
        setLoading(true);
        const tempDirection = getSortDirection(sortDirection);
        setSortDirection(tempDirection);
        const sortObj = {
            'sort': 'date',
            'direction': tempDirection
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
                    <div className="flex flex-col">
                        <div className="text-[14px]">Search by title</div>
                        <div className="flex gap-2">
                            <Input onChange={handleSearchTermChange} value={searchTerm as string} />
                            <IconButton title='Search by title' onClick={handleSearch} icon={searchIcon} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-[14px]">Filter by author</div>
                        <div className="flex gap-2">
                            <Select defaultValue={searchParams.get('author') as string} onChange={handleSelectAuthor} options={authors}  />
                            {searchParams.get('author') && <IconButton title='Clear author filter' onClick={() => removeFilter('author')} icon={deleteIcon} />}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-[14px]">Filter by publisher</div>
                        <div className="flex gap-2">
                            <Select defaultValue={searchParams.get('publisher') as string} onChange={handleSelectPublisher} options={publishers}  />
                            {searchParams.get('publisher') && <IconButton title='Clear publisher filter' onClick={() => removeFilter('publisher')} icon={deleteIcon} />}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="h-[20px]"></div>
                        <div className="flex border-[1px] rounded-[8px] border-slate-200 pl-2 pr-2 pt-1 pb-1">
                            <IconButton className="h-[24px] w-[32px]" title='Sort by date' onClick={handleSort} icon={calendarIcon} />
                            <IconButton className="h-[24px]" title='Sort by date' onClick={handleSort} icon={searchParams.get('direction') === SortDirection.DESC ? sortDownIcon : sortUpIcon} />
                        </div>
                    </div>
                    <div>
                        <div className="h-[20px]"></div>
                        {loading && <BounceLoader size={32} color='#8D77AB' />}
                    </div>
            </div>
    );
}