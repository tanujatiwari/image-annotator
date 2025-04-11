'use client'
import Divider from '@/app/sdk/components/divider';
import { default as Input, InputProps } from '@/app/sdk/components/input';
import clsx from 'clsx';
import { useState } from 'react';
import { IoMdSend } from 'react-icons/io';

interface NewCommentProps {
  handleCreateComment: (imageId: string, input: string) => void;
  imageId: string;
  inputProps?: InputProps;
  wrapperClassName?: string;
}

export default function NewComment({
  handleCreateComment,
  imageId,
  inputProps,
  wrapperClassName,
}: NewCommentProps) {
  const [input, setInput] = useState('');
  return (
    <div className={clsx(wrapperClassName)}>
      <Input
        placeholder='Add Comment'
        className='p-4'
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            handleCreateComment(imageId, input);
          }
        }}
        value={input}
        autoFocus
        {...inputProps}
      />
      {input && (
        <div className='flex flex-col pb-1'>
          <Divider />
          <div className='flex items-center justify-between mx-4'>
            <p className='text-gray-500 text-2xl'>@</p>
            <IoMdSend
              fill='#0362fc'
              className='justify-self-end cursor-pointer ml-auto'
              size={25}
              onClick={() => handleCreateComment(imageId, input)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
