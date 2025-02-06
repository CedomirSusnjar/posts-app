import { ChangeEvent } from "react";

type SelectProps = {
    defaultValue: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
}

export const Select = ({ defaultValue, onChange, options }: SelectProps) => {

    return (
        <select defaultValue={defaultValue} onChange={onChange} className="w-[300px] h-[32px] border border-slate-200 bg-[#fff] rounded-[8px] pl-2">
            <option selected={defaultValue === undefined} disabled hidden style={{ display: 'none' }} value=''></option>
            {options.map((option: string) => {
                return  (
                    <option key={option} value={option} >{option}</option>
                );
        })}</select>
    );
};