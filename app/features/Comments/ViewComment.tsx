import UserIcon from '@/app/sdk/components/userIcon';
import { ImageComment } from '@/app/sdk/types';
import { getFormattedTimeDifferenceFromNow } from '@/app/sdk/utils/constants';
import clsx from 'clsx';

export default function ViewComment({
  comment,
  className,
}: {
  comment: ImageComment | null;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'flex flex-col p-2 gap-x-2 gap-y-2 max-h-[200px] overflow-y-scroll',
        className
      )}
    >
      <Comment comment={comment} />
      {comment?.replies?.map((reply) => (
        <Comment comment={reply} key={reply.commentId} />
      ))}
    </div>
  );
}

const Comment = ({ comment }: { comment: ImageComment | null }) => {
  return (
    <div className='flex gap-2'>
      <UserIcon name={comment?.author.name || ''} />
      <div>
        <div className='flex gap-2 items-center'>
          <p>{comment?.author.name}</p>
          <p className='text-sm text-gray-500'>
            {getFormattedTimeDifferenceFromNow(comment?.timestamp || '')}
          </p>
        </div>
        <p>{comment?.comment}</p>
      </div>
    </div>
  );
};
