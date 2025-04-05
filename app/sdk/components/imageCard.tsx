import clsx from 'clsx';
import { ReactNode } from 'react';
import { MdPhotoSizeSelectActual } from 'react-icons/md';

interface ImageCardProps extends React.HTMLProps<HTMLDivElement> {
  name: string;
  url: string;
  rightActions?: ReactNode;
  imageProps?: React.HTMLProps<HTMLDivElement>;
}

export default function ImageCard({
  name,
  url,
  className,
  rightActions,
  imageProps,
  ...rest
}: ImageCardProps) {
  return (
    <div
      className={clsx(
        'p-2 bg-white rounded-md h-[200px] w-[230px] space-y-2 cursor-pointer',
        className
      )}
      {...rest}
    >
      <div className='flex items-center justify-between'>
        <ImageCardHeader name={name} />
        {rightActions || null}
      </div>
      <div
        style={{
          background: `url(${url}) no-repeat center center/cover`,
        }}
        className='bg-cover bg-center w-[215px] h-[150px] rounded-lg'
        {...imageProps}
      />
    </div>
  );
}

export const ImageCardHeader = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  return (
    <div className={clsx('flex items-center gap-1 max-w-[230px]', className)}>
      <MdPhotoSizeSelectActual size={20} fill='#ffd063' />
      <p className='truncate'>{name}</p>
    </div>
  );
};
