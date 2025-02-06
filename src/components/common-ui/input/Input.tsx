import { ChangeEvent } from "react";

type InputProps = {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

export const Input = ({ onChange, value }: InputProps) => {
    return (
        <input onChange={onChange} value={value} className="h-[32px] w-[300px] border border-slate-200 bg-[#fff] rounded-[8px] pl-2"></input>
    );
};