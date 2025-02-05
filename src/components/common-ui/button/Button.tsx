/* eslint-disable @typescript-eslint/no-explicit-any */
type ButtonProps = {
    onClick: (event: any) => void;
    text: string;
};

export const Button = ({ onClick, text, ...props }: ButtonProps) => {
    return (
        <button {...props} onClick={onClick} className="w-[300px] border border-slate-200 bg-[#E1EACD]">{text}</button>
    );
};