import { useEffect, useRef, useState } from 'react';

export default function useHandleClickOutside() {
  const ref = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return {
    ref,
    isOpen,
    setIsOpen,
  };
}
