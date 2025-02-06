import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () => {
    const router = useRouter();
    const path = router.pathname;

    return (
        <div className={`flex gap-6 p-6 w-[100%] text-center bg-[#8D77AB] fixed top-0 z-10 font-bold`}>
            <Link className={`text-[18px] text-white ${path === '/' && 'underline'}`} href='/'>Home</Link>
            <Link className={`text-[18px] text-white ${path === '/articles' && 'underline'}` } href='/articles'>Articles</Link>
            <Link className={`text-[18px] text-white ${path === '/favourite-articles' && 'underline'}` } href='/favourite-articles'>Favourites</Link>
        </div>
    );
};