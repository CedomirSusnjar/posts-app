import Link from "next/link";

export const Header = () => {
    return (
        <div className="flex gap-6 p-6 w-[100%] text-center bg-[#8D77AB] fixed top-0 z-10 font-bold">
            <Link className="text-[18px] text-white" href='/'>Home</Link>
            <Link className="text-[18px] text-white" href='/articles'>Articles</Link>
            <Link className="text-[18px] text-white" href='/favourite-articles'>Favourites</Link>
        </div>
    );
};