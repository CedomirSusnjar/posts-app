/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { Input, Select } from "../common-ui";
import { IconButton } from "../common-ui/button/IconButton";
import { BounceLoader } from "react-spinners";
import searchIcon from '../../assets/search.png';
import deleteIcon from '../../assets/delete.png';
import sortDownIcon from '../../assets/sort-down.png';
import sortUpIcon from '../../assets/sort-up.png';
import calendarIcon from '../../assets/calendar.png';

export const Filter = ({ authors, publishers }: any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('searchTerm') as string ?? '');
    // const [sortDirection, setSortDirection] = useState<string>(searchParams.get('searchTerm') as string ?? 'asc');

    const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    };

    const handleSearch = async () => {
        setLoading(true);
        // router.set('searchTerm') = searchTerm;
        // router.push(router);
    };

    const handleSelectAuthor = (event: ChangeEvent<HTMLSelectElement>) => {
        setLoading(true);
        console.log(event);
        // router.query.author = event.target.value;
        // router.push(router);
    };

     const handleSelectPublisher = (event: ChangeEvent<HTMLSelectElement>) => {
        setLoading(true);
        console.log(event);
        // router.query.publisher = event.target.value;
        // router.push(router);
    };


    useEffect(() => {
        // const fetchData = async () => {
        //     const { searchTerm, author, sort, direction, publisher } = router.query;
        //     const response = 
        //         await fetch(`/api/articles?searchTerm=${searchTerm}&author=${author}&sort=${sort}&direction=${direction}&publisher=${publisher}`);
        //     const data = await response.json();
        //     setLoading(false);
        // };
        // fetchData();
        
    }, [router]);

    const handleSort = () => {
        // setLoading(true);
        // router.query.sort = 'date';
        // let tempDirection = '';
        // if(sortDirection === 'asc') {
        //     tempDirection = 'desc';          
        // } else {
        //     tempDirection = 'asc';
        // }
        // setSortDirection(tempDirection);
        // router.query.direction = tempDirection;
        // router.push(router);
    };

    const clearFilter = (filterName: string) => {
        setLoading(true);
        console.log(filterName);
        // delete router.query[filterName];
        // router.push(router);
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
                            {searchParams.get('author') && <IconButton title='Clear author filter' onClick={() => clearFilter('author')} icon={deleteIcon} />}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-[14px]">Filter by publisher</div>
                        <div className="flex gap-2">
                            <Select defaultValue={searchParams.get('publisher') as string} onChange={handleSelectPublisher} options={publishers}  />
                            {searchParams.get('publisher') && <IconButton title='Clear publisher filter' onClick={() => clearFilter('publisher')} icon={deleteIcon} />}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="h-[20px]"></div>
                        <div className="flex border-[1px] rounded-[8px] border-slate-200 pl-2 pr-2 pt-1 pb-1">
                            <IconButton className="h-[24px] w-[32px]" title='Sort by date' onClick={handleSort} icon={calendarIcon} />
                            <IconButton className="h-[24px]" title='Sort by date' onClick={handleSort} icon={searchParams.get('direction') === 'desc' ? sortDownIcon : sortUpIcon} />
                        </div>
                    </div>
                    <div>
                        <div className="h-[20px]"></div>
                        {loading && <BounceLoader size={32} color='red' />}
                    </div>
            </div>
    );
}