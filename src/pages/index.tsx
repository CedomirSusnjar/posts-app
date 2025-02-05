import { Header } from "@/components";
import Head from "next/head";

export default function Homepage() {
    return (
        <div className="flex flex-col items-center">
            <Head>
                <title>Articles</title>
                <meta name="description" content="This is a description of articles page" />
                <meta property="og:title" content="My Awesome Next.js App" />
                <meta property="og:description" content="This is a description of articles page" />
                <meta property="og:image" content="https://my-app.com/image.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <Header />
            <div className="flex justif-center items-center text-[24px] pt-[75px] h-[calc(100vh)]">
                Welcome to your favourite website for surfing the news!
            </div>
        </div>
    );
};