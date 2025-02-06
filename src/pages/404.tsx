import Link from "next/link";

export default function CustomNotFoundPage() {
    return (
        <div className="flex flex-col gap-4 justify-center items-center h-[100vh]">
            <h1 className="text-[34px]">404 Page not found</h1>
            <Link className="underline" href='/'>Return to home page</Link>
        </div>
    );
}