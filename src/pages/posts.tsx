import { PostsList } from "@/components/posts/PostsList";
import { useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function PostsPage({ posts }: any) {

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [items, setItems] = useState<any[]>(posts);

    const handleSearchTermChange = (event: any) => {
        console.log(event.target.value);
        setSearchTerm(event.target.value)
    };

    const handleSearch = async () => {
        const response = await fetch(`/api/posts?query=${searchTerm}`);
        const data = await response.json();
        console.log(data);
        setItems(data);
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className="text-[24px] p-6">Posts</div>
            <input onChange={handleSearchTermChange} value={searchTerm} className="w-[300px] border border-slate-200"></input>
            <button onClick={handleSearch} className="w-[300px] border border-slate-200" >Search</button>
            <PostsList posts={items} />
        </div>
    );
};

export const getServerSideProps = async ({ params }: any) => {
    console.log(params);
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json());

    return {
        props: {
            posts
        }
    }
};