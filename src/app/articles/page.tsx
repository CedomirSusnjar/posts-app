import { Input, Page, Select } from "@/components";
import { Article, ArticlesList } from "@/components/articles/ArticlesList";
import { IconButton } from "@/components/common-ui/button/IconButton";
import { getArticlesPageProps } from "@/utils/articles";
import { ChangeEvent } from "react";
import sortDownIcon from '../assets/sort-down.png';
import sortUpIcon from '../assets/sort-up.png';
import searchIcon from '../assets/search.png';
import calendarIcon from '../assets/calendar.png';
import deleteIcon from '../assets/delete.png';
import { BounceLoader } from "react-spinners";
import { theme } from "@/theme";
// import { useSearchParams } from "next/navigation";

export type PostPageProps = {
    news: Article[];
    authors: string[];
    publishers: string[];
};

export const metadata = {
    title: 'Articles',
    description: 'This is a description of articles page',
    openGraph: {
        title: 'Articles',
        description: 'This is a description of articles page',
        // image: 'https://my-app.com/image.jpg'
    },
    twitter: {
        card: 'summary_large_image'
    }
};

export default async function PostsPage() {
    
    const articles = await fetch(`http://localhost:3000/api/articles`).then(response => response.json());
    const favouriteArticles = await fetch('http://localhost:3000/api/favourite-articles').then(response => response.json());

    const { news, authors, publishers } = getArticlesPageProps(articles, favouriteArticles, {})

    // const [loading, setLoading] = useState<boolean>(false);
    // const searchParams = useSearchParams();
    // const router = useRouter();
    // const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('searchTerm') as string ?? '');
    // const [sortDirection, setSortDirection] = useState<string>(searchParams.get('searchTerm') as string ?? 'asc');

    // const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     setSearchTerm(event.target.value)
    // };

    // const handleSearch = async () => {
    //     setLoading(true);
    //     // router.set('searchTerm') = searchTerm;
    //     // router.push(router);
    // };

    // const handleSelectAuthor = (event: ChangeEvent<HTMLSelectElement>) => {
    //     setLoading(true);
    //     // router.query.author = event.target.value;
    //     // router.push(router);
    // };

    //  const handleSelectPublisher = (event: ChangeEvent<HTMLSelectElement>) => {
    //     setLoading(true);
    //     // router.query.publisher = event.target.value;
    //     // router.push(router);
    // };


    // useEffect(() => {
    //     const fetchData = async () => {
    //         const { searchTerm, author, sort, direction, publisher } = router.query;
    //         const response = 
    //             await fetch(`/api/articles?searchTerm=${searchTerm}&author=${author}&sort=${sort}&direction=${direction}&publisher=${publisher}`);
    //         const data = await response.json();
    //         setItems(data)
    //         setLoading(false);
    //     };
    //     fetchData();
        
    // }, [router]);

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

    // const clearFilter = (filterName: string) => {
    //     setLoading(true);
    //     // delete router.query[filterName];
    //     // router.push(router);
    // };

    const markAsFavouriteHandler = async (article: Article) => {
        'use server'
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
            <h1 className="text-[28px] mb-[3rem]">
                Here are your articles for today, enjoy...
            </h1>
            <h1 className="text-[28px] mb-[3rem]">
                Here are your articles for today, enjoy...
            </h1>
            {/* <div className="flex w-[100%] gap-8 pb-5">
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
                        {loading && <BounceLoader size={32} color={`${theme.appColor}`} />}
                    </div>
            </div> */}
            <ArticlesList markAsFavouriteHandler={markAsFavouriteHandler} news={news} />
        </Page>
    );
};

// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//     const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.API_KEY}`).then(response => response.json());
//     const favouriteArticles = await fetch('http://localhost:3000/api/favourite-articles').then(response => response.json());

//     return {
//         props: {
//            ...getArticlesPageProps(response.articles, favouriteArticles, context.query as CommonFilters)
//         }
//     }
// };