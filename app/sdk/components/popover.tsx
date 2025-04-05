import clsx from 'clsx';
import { ForwardedRef, forwardRef } from 'react';

const Popover = forwardRef(
  (
    { className, children, ...rest }: React.HTMLProps<HTMLDivElement>,
    ref: ForwardedRef<HTMLDivElement | null>
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'absolute w-max max-w-[250px] h-20 bg-white rounded-lg',
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default Popover;

Popover.displayName = 'Popover';
