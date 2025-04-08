import { SvgEmptyBucket } from '@/app/sdk/assets/svgs';
import Button from '@/app/sdk/components/button';
import { ChangeEvent, useRef } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';

const EmptyState = ({
  handleInputChange,
}: {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className='w-full h-full flex items-center justify-center flex-col space-y-2 px-1'>
      <input
        type='file'
        id='file-input'
        hidden
        multiple
        ref={inputRef}
        onChange={handleInputChange}
        accept={'.jpeg,.png'}
      />
      <SvgEmptyBucket />
      <p>Drop images here</p>
      <p className='text-gray-400'>or use upload button to upload images</p>
      <Button
        prefix={<MdOutlineFileUpload size={20} />}
        className='!bg-blue-600'
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        Upload
      </Button>
    </div>
  );
};

export default EmptyState;
