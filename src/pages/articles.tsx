import { Input, Page, Select } from "@/components";
import { Article, ArticlesList } from "@/components/articles/ArticlesList";
import { IconButton } from "@/components/common-ui/button/IconButton";
import { getArticlesPageProps } from "@/utils/articles";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import sortDownIcon from '../assets/sort-down.png';
import sortUpIcon from '../assets/sort-up.png';
import searchIcon from '../assets/search.png';
import calendarIcon from '../assets/calendar.png';
import deleteIcon from '../assets/delete.png';
import { BounceLoader } from "react-spinners";
import { theme } from "@/theme";
import { GetServerSidePropsContext } from "next";
import { ArticlesFilters } from "@/types/articlesFilters";

export type PostPageProps = {
    news: Article[];
    authors: string[];
    publishers: string[];
};

export default function PostsPage({ news, authors, publishers }: PostPageProps) {
    const [items, setItems] = useState<Article[]>(news);
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>(router.query.searchTerm as string ?? '');
    const [sortDirection, setSortDirection] = useState<string>(router.query.searchTerm as string ?? 'asc');

    const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    };

    const handleSearch = async () => {
        setLoading(true);
        router.query.searchTerm = searchTerm;
        router.push(router);
    };

    const handleSelectAuthor = (event: ChangeEvent<HTMLSelectElement>) => {
        setLoading(true);
        router.query.author = event.target.value;
        router.push(router);
    };

     const handleSelectPublisher = (event: ChangeEvent<HTMLSelectElement>) => {
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
        try {
            await fetch(`/api/mark-article-favourite`, {
                method: 'POST',
                body: JSON.stringify({
                    article: article
                })
            });
        } catch(error: unknown) {
            console.error(error);
        }
    };

    return (
        <Page>
            <Head>
                <title>Articles</title>
                <meta name="description" content="This is a description of articles page" />
                <meta property="og:title" content="My Awesome Next.js App" />
                <meta property="og:description" content="This is a description of articles page" />
                <meta property="og:image" content="https://my-app.com/image.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <h1 className="text-[28px] mb-[3rem]">
                Here are your articles for today, enjoy...
            </h1>
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
                            <Select defaultValue={router.query.author as string} onChange={handleSelectAuthor} options={authors}  />
                            {router.query.author && <IconButton title='Clear author filter' onClick={() => clearFilter('author')} icon={deleteIcon} />}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-[14px]">Filter by publisher</div>
                        <div className="flex gap-2">
                            <Select defaultValue={router.query.publisher as string} onChange={handleSelectPublisher} options={publishers}  />
                            {router.query.publisher && <IconButton title='Clear publisher filter' onClick={() => clearFilter('publisher')} icon={deleteIcon} />}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="h-[20px]"></div>
                        <div className="flex border-[1px] rounded-[8px] border-slate-200 pl-2 pr-2 pt-1 pb-1">
                            <IconButton className="h-[24px] w-[32px]" title='Sort by date' onClick={handleSort} icon={calendarIcon} />
                            <IconButton className="h-[24px]" title='Sort by date' onClick={handleSort} icon={router.query.direction === 'desc' ? sortDownIcon : sortUpIcon} />
                        </div>
                    </div>
                    <div>
                        <div className="h-[20px]"></div>
                        {loading && <BounceLoader size={32} color={`${theme.appColor}`} />}
                    </div>
            </div>
            <ArticlesList markAsFavouriteHandler={markAsFavouriteHandler} news={items} />
        </Page>
    );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=5466550fed754acc881cffa1c0c6a2bd').then(response => response.json());
    const favouriteArticles = await fetch('http://localhost:3000/api/favourite-articles').then(response => response.json());

    return {
        props: {
           ...getArticlesPageProps(response.articles, favouriteArticles, context.query as ArticlesFilters)
        }
    }
};