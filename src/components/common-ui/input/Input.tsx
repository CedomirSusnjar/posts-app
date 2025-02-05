/* eslint-disable @typescript-eslint/no-explicit-any */
type InputProps = {
    onChange: (event: any) => void;
    value: string;
}

export const Input = ({ onChange, value }: InputProps) => {
    return (
        <input onChange={onChange} value={value} className="w-[300px] border border-slate-200 bg-[#fff] rounded-[8px] pl-2"></input>
    );
};