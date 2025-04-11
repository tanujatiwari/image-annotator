import Button from '@/app/sdk/components/button';
import { ChangeEvent, useRef } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';

export default function UploadButton({
  handleInputChange,
}: {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        type='file'
        id='file-input'
        hidden
        multiple
        ref={inputRef}
        onChange={handleInputChange}
        accept={'.jpeg,.png,.jpg'}
      />
      <Button
        prefix={<MdOutlineFileUpload size={20} />}
        className='!bg-blue-600'
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        Upload
      </Button>
    </>
  );
}
