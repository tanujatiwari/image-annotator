import Divider from '@/app/sdk/components/divider';
import UserIcon from '@/app/sdk/components/userIcon';
import { ImageComment } from '@/app/sdk/types';
import { RxCross2 } from 'react-icons/rx';
import NewComment from './NewComment';
import ViewComment from './ViewComment';

interface EditCommentProps {
  image: {
    url: string;
    name: string | undefined;
    isSelected: boolean;
    id: string | undefined;
  };
  hoveredComment: ImageComment | null;
  handleCreateReply: (imageId: string, input: string) => void;
  handleClose?: () => void;
}

export default function EditComment({
  image,
  hoveredComment,
  handleCreateReply,
  handleClose,
}: EditCommentProps) {
  return (
    <div className='p-2'>
      <div className='flex justify-between items-center'>
        <p className='font-medium'>Comment</p>
        <RxCross2
          fill='#d4d6d9'
          onClick={handleClose}
          className='cursor-pointer'
        />
      </div>
      <Divider />
      <ViewComment comment={hoveredComment} className='!p-0 !pt-2' />
      <NewComment
        handleCreateComment={handleCreateReply}
        imageId={image.id || ''}
        inputProps={{
          prefix: <UserIcon name='Tanuja' />,
          className: 'px-0',
        }}
        wrapperClassName='border rounded-lg px-2 mt-2 border-gray-200'
      />
    </div>
  );
}
