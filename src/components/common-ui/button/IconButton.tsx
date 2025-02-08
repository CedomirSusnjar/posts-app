import Image from 'next/image';

type IconButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  icon: string;
};

export const IconButton = ({ onClick, icon, ...props }: IconButtonProps) => {
  return (
    <button className="w-[32px] h-[32px]" onClick={onClick} {...props}>
      <Image src={icon} alt="" />
    </button>
  );
};
