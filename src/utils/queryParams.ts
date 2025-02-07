import { SortDirection } from "@/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const updateQueryParams = (path: string, newQueryParams: { [key: string]: string }, searchParams: any) => {
    const newQuery = new URLSearchParams(searchParams.toString() as Record<string, string>);
    Object.keys(newQueryParams).forEach((key: string) => {
        newQuery.set(key, newQueryParams[key] as string);
    });
    
    return `http://localhost:3000/${path}?${newQuery.toString()}`;  
};

export const getSortDirection = (sortDirection: SortDirection) => {
    let tempDirection: SortDirection = SortDirection.ASC;
    if(sortDirection === SortDirection.ASC) {
        tempDirection = SortDirection.DESC;          
    } else {
        tempDirection = SortDirection.ASC;
    }
    return tempDirection;
};