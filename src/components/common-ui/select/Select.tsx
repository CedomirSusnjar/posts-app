/* eslint-disable @typescript-eslint/no-explicit-any */
type SelectProps = {
    defaultValue: string;
    onChange: (event: any) => void;
    options: any[];
}

export const Select = ({ defaultValue, onChange, options }: SelectProps) => {
    return (
        <select defaultValue={defaultValue} onChange={onChange} className="w-[300px] border border-slate-200 bg-[#fff] rounded-[8px] pl-2">
            <option selected disabled hidden style={{ display: 'none' }} value=''></option>
            {options.map((option: string) => {
                return  (
                    <option key={option} value={option} >{option}</option>
                );
        })}</select>
    );
};