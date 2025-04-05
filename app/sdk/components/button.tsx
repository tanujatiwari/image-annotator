import clsx from 'clsx';
import Link from 'next/link';
import { ComponentProps, ReactNode } from 'react';

interface IButtonProps extends Omit<ComponentProps<'button'>, 'prefix'> {
  prefix?: ReactNode;
  suffix?: ReactNode;
  variant?: 'button' | 'link';
  href?: string;
}

export default function Button({
  prefix,
  suffix,
  children,
  className,
  variant = 'button',
  href,
  ...rest
}: IButtonProps) {
  if (variant === 'link') {
    return (
      <Link
        href={href || '#'}
        className={clsx(
          'flex items-center justify-center gap-10 text-primary-light',
          className
        )}
      >
        {prefix}
        {children}
        {suffix}
      </Link>
    );
  }
  return (
    <button
      className={clsx(
        'flex items-center justify-center gap-1 text-white py-2 px-3 rounded-lg cursor-pointer',
        className
      )}
      {...rest}
    >
      {prefix}
      {children}
      {suffix}
    </button>
  );
}
