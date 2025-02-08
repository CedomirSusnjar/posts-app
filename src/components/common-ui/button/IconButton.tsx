import Image, { StaticImageData } from 'next/image';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  title: string;
  icon: StaticImageData;
}

export const IconButton = ({ onClick, icon, ...props }: IconButtonProps) => {
  return (
    <button className="w-[32px] h-[32px]" onClick={onClick} {...props}>
      <Image src={icon} alt="" />
    </button>
  );
};
