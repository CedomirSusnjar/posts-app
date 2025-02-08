import Image from 'next/image';

export const IconButton = ({ onClick, icon, ...props }: any) => {
  return (
    <button className="w-[32px] h-[32px]" onClick={onClick} {...props}>
      <Image src={icon} alt="" />
    </button>
  );
};
