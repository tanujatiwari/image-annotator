import clsx from 'clsx';
import { ReactNode } from 'react';
import { RxCross2 } from 'react-icons/rx';

interface IModalProps extends React.HTMLProps<HTMLDivElement> {
  close: () => void;
  leftContent?: ReactNode;
}

export default function Modal({
  className,
  children,
  close,
  leftContent,
  ...rest
}: IModalProps) {
  return (
    <div
      className={clsx(
        'absolute h-screen w-screen bg-black/80 z-50 top-0 left-0',
        className
      )}
      {...rest}
    >
      <nav className='bg-black/50 h-[var(--navbar-height)] flex justify-between items-center p-10'>
        {leftContent || <div />}
        <div>
          <RxCross2 color='#fff' size={25} onClick={close} className='cursor-pointer' />
        </div>
      </nav>
      {children}
    </div>
  );
}
