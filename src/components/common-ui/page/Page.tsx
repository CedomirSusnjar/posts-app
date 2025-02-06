import { Header } from "@/components/header";
import { ReactElement } from "react";

export const Page = ({ children }: { children: ReactElement[] }) => {
    return (
        <div className='flex flex-col bg-[#fff]'>
            <Header />
            <div className="pl-4 pr-4 pb-4 pt-[130px]">
                {children}          
            </div> 
        </div>
    );
};