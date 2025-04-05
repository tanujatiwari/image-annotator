import clsx from 'clsx';
import { ComponentProps, ReactNode } from 'react';

export interface InputProps extends Omit<ComponentProps<'input'>, 'prefix'> {
  prefix?: ReactNode;
}

export default function Input({ className, prefix, ...rest }: InputProps) {
  return (
    <div className='flex gap-1 items-center'>
      {prefix}
      <input
        type='text'
        className={clsx(
          'border-none p-2 focus:border-none focus:outline-none',
          className
        )}
        {...rest}
      />
    </div>
  );
}
