import { GetServerSidePropsContext } from "next";

export default function ArticlePage() {
    return (
        <div>single article page</div>
        // create html page for single article
    );
};

export const getServerSideProps = (context: GetServerSidePropsContext) => {
    console.log(context);
    // return single article from database using /api/file.ts
};