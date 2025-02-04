import { Article, ArticlesList } from "@/components/articles/ArticlesList";
import { filterPostResponse } from "@/utils/articles";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function PostsPage({ news, authors }: any) {
    const [items, setItems] = useState<any[]>(news);

    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>(router.query.searchTerm as string ?? '');
    const [sortDirection, setSortDirection] = useState<string>(router.query.searchTerm as string ?? 'asc');

    console.log(news);

    const handleSearchTermChange = (event: any) => {
        setSearchTerm(event.target.value)
    };

    const handleSearch = async () => {
        router.query.searchTerm = searchTerm;
        router.push(router);
    };

    const handleSelectAuthor = (event: any) => {
        router.query.author = event.target.value;
        router.push(router);
    };

    useEffect(() => {
        const fetchData = async () => {
            const { searchTerm, author, sort, direction } = router.query;
            const response = await fetch(`/api/articles?searchTerm=${searchTerm}&author=${author}&sort=${sort}&direction=${direction}`);
            const data = await response.json();
            setItems(data);
        };
        fetchData();
        
    }, [router]);

    const handleSort = () => {
        router.query.sort = 'date';
        let tempDirection = '';
        if(sortDirection === 'asc') {
            tempDirection = 'desc';          
        } else {
            tempDirection = 'asc';
        }
        setSortDirection(tempDirection);
        router.query.direction = tempDirection;
        router.push(router);
    };

    const clearFilter = (filterName: string) => {
        router.query[filterName] = 'undefined';
        router.push(router);
    };

    console.log(items, 'asdasdasdasd');

    return (
        <div className='flex flex-col items-center gap-4 bg-[#BAD8B6]'>
            <div className="text-[24px] p-6  w-[100%] text-center bg-[#E1EACD]">Posts</div>
            <input onChange={handleSearchTermChange} value={searchTerm} className="w-[300px] border border-slate-200 bg-[#E1EACD]"></input>
            <button onClick={handleSearch} className="w-[300px] border border-slate-200 bg-[#E1EACD]" >Search by title</button>
            <select defaultValue={router.query.author} onChange={handleSelectAuthor} className="w-[300px] border border-slate-200 bg-[#E1EACD]">{authors.map((author: string) => {
                return  (
                    <option key={author} value={author} >{author}</option>
                );
            })}</select>
            <button className="border border-slate-200 bg-[#E1EACD]" onClick={() => clearFilter('author')}>Clear Author</button>
            <button onClick={handleSort} className="w-[300px] border border-slate-200 bg-[#E1EACD]">Sort by date - {sortDirection}</button>
            <ArticlesList news={items} />
        </div>
    );
};

export const getServerSideProps = async (context: any) => {
    const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=5466550fed754acc881cffa1c0c6a2bd').then(response => response.json());
    console.log(response);
    const authors = [...new Set(response.articles.map((post: Article) => post.author))]; 
    return {
        props: {
            news: filterPostResponse(response.articles, context.query),
            authors
        }
    }
};