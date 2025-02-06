import { Input, Select } from "@/components";
import { Article, ArticlesList } from "@/components/articles/ArticlesList";
import { IconButton } from "@/components/common-ui/button/IconButton";
import { Header } from "@/components/header";
import { filterPostResponse } from "@/utils/articles";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import sortIcon from '../assets/sort.png';
import searchIcon from '../assets/search.png';
import deleteIcon from '../assets/delete.png';
import { BounceLoader } from "react-spinners";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function PostsPage({ news, authors, publishers }: any) {
    const [items, setItems] = useState<any[]>(news);
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>(router.query.searchTerm as string ?? '');
    const [sortDirection, setSortDirection] = useState<string>(router.query.searchTerm as string ?? 'asc');

    const handleSearchTermChange = (event: any) => {
        setSearchTerm(event.target.value)
    };

    const handleSearch = async () => {
        setLoading(true);
        router.query.searchTerm = searchTerm;
        router.push(router);
    };

    const handleSelectAuthor = (event: any) => {
        setLoading(true);
        router.query.author = event.target.value;
        router.push(router);
    };

     const handleSelectPublisher = (event: any) => {
        setLoading(true);
        router.query.publisher = event.target.value;
        router.push(router);
    };


    useEffect(() => {
        const fetchData = async () => {
            const { searchTerm, author, sort, direction, publisher } = router.query;
            const response = 
                await fetch(`/api/articles?searchTerm=${searchTerm}&author=${author}&sort=${sort}&direction=${direction}&publisher=${publisher}`);
            const data = await response.json();
            setItems(data)
            setLoading(false);
        };
        fetchData();
        
    }, [router]);

    const handleSort = () => {
        setLoading(true);
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
        setLoading(true);
        delete router.query[filterName];
        router.push(router);
    };

    const markAsFavouriteHandler = async (article: Article) => {
        const response = await fetch(`/api/mark-article-favourite`, {
            method: 'POST',
            body: JSON.stringify({
                article: article
            })
        });
        const data = await response.json();

        console.log(data);
    };

    return (
        <div className='flex flex-col bg-[#fff]'>
            <Head>
                <title>Articles</title>
                <meta name="description" content="This is a description of articles page" />
                <meta property="og:title" content="My Awesome Next.js App" />
                <meta property="og:description" content="This is a description of articles page" />
                <meta property="og:image" content="https://my-app.com/image.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <Header />
            <div className="pl-4 pr-3 pb-3">
                <div className="flex w-[100%] gap-8 pb-5 pt-[130px]">
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
                            <Select defaultValue={router.query.author as string} onChange={handleSelectAuthor} options={authors}  />
                            <IconButton title='Clear author filter' onClick={() => clearFilter('author')} icon={deleteIcon} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-[14px]">Filter by publisher</div>
                        <div className="flex gap-2">
                            <Select defaultValue={router.query.publisher as string} onChange={handleSelectPublisher} options={publishers}  />
                            <IconButton title='Clear publisher filter' onClick={() => clearFilter('publisher')} icon={deleteIcon} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-[14px]">Sort by date</div>
                        <div className="flex gap-2">
                            <IconButton title='Sort by date' onClick={handleSort} icon={sortIcon} />
                        </div>
                    </div>
                    <div>
                        {loading && <BounceLoader size={32} color="#8D77AB" />}
                    </div>
                </div>
                <ArticlesList markAsFavouriteHandler={markAsFavouriteHandler} news={items} />
                <div className="mt-14" />
            </div>
        </div>
    );
};

export const getServerSideProps = async (context: any) => {
    const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=5466550fed754acc881cffa1c0c6a2bd').then(response => response.json());
    const favouriteArticlesResponse = await fetch('http://localhost:3000/api/favourite-articles');
    const favouriteArticles = await favouriteArticlesResponse.json();

    const responseWithFavourites = response.articles.map((article: Article) => {
        if(favouriteArticles.find((articleF: Article) => articleF.title === article.title)) {
            return {
                ...article,
                publisher: article.source.name,
                isFavourite: true
            } 
        } else return {
                ...article,
                publisher: article.source.name,
        }
    })
    const authors = [...new Set(response.articles.map((post: Article) => post.author))];
    const publishers = [...new Set(response.articles.map((post: Article) => post.source.name))];
    return {
        props: {
            news: filterPostResponse(responseWithFavourites, context.query),
            authors,
            publishers
        }
    }
};