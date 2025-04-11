import { SvgEmptyBucket } from '@/app/sdk/assets/svgs';
import { ChangeEvent } from 'react';
import UploadButton from './UploadButton';

const EmptyState = ({
  handleInputChange,
}: {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className='w-full h-full flex items-center justify-center flex-col space-y-2 px-1'>
      <SvgEmptyBucket />
      <p>Drop images here</p>
      <p className='text-gray-400'>or use upload button to upload images</p>
      <UploadButton handleInputChange={handleInputChange} />
    </div>
  );
};

export default EmptyState;
