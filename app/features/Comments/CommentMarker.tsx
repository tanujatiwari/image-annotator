import { SvgCommentMarker } from '@/app/sdk/assets/svgs';
import { ImageComment } from '@/app/sdk/types';

export default function CommentMarker({
  comment,
  onClick,
  onHover,
  onMouseLeave,
}: {
  comment: ImageComment;
  onClick: () => void;
  onHover?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <div
      className='fixed cursor-pointer'
      style={{
        top: comment.position?.y,
        left: comment.position?.x,
      }}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onMouseLeave}
    >
      <p className='absolute z-10 left-[13px] top-[7px] text-sm text-white'>
        {comment.author.name.charAt(0)}
      </p>
      <SvgCommentMarker className='absolute' />
    </div>
  );
}
