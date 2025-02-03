import Link from "next/link";

export default function Homepage() {
    return (
        <div>
            <div>
                <Link href='/posts'>Posts</Link>
                <Link href='/favourite'>Favourites</Link>
            </div>
        </div>
    );
};