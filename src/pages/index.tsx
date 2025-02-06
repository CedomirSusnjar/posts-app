import { Page } from "@/components";
import Head from "next/head";

export default function Homepage() {
    return (
        <Page>
            <Head>
                <title>Homepage</title>
                <meta name="description" content="This is a description of home page" />
                <meta property="og:title" content="My Awesome Next.js App" />
                <meta property="og:description" content="This is a description of home page" />
                <meta property="og:image" content="https://my-app.com/image.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <div className="flex justify-center items-center text-[24px] mb-5">
                Welcome to your favourite website for surfing the news!
            </div>
            <div className="flex justify-center items-center text-[24px] mb-5">
                Check &apos;Articles&apos; link to see best articles today!
            </div>
            <div className="flex justify-center items-center text-[24px]">
                Under &apos;Favourites&apos; you will see articles you marked as your&apos;s best
            </div>
        </Page>
    );
};