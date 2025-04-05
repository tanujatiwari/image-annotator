import { ImageCardHeader } from '@/app/sdk/components';
import Modal from '@/app/sdk/components/modal';
import Popover from '@/app/sdk/components/popover';
import { Comments, ImageComment } from '@/app/sdk/types';
import clsx from 'clsx';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import CommentMarker from '../Comments/CommentMarker';
import EditComment from '../Comments/EditComment';
import NewComment from '../Comments/NewComment';
import ViewComment from '../Comments/ViewComment';
import useImageViewer from './useImageViewer';

interface ImageViewerProps {
  close: () => void;
  image: {
    url: string;
    name: string | undefined;
    isSelected: boolean;
    id: string | undefined;
  };
  comments?: ImageComment[];
  setComments: Dispatch<SetStateAction<Comments | undefined>>;
}

export default function ImageViewer({
  close,
  image,
  setComments,
  comments,
}: ImageViewerProps) {
  const {
    isOpen,
    popoverRef,
    position,
    setIsOpen,
    setPosition,
    handleImageClick,
    handleCreateComment,
    handleCreateReply,
    hoveredComment,
    setHoveredComment,
    mode,
    setMode,
    handleEditClose,
  } = useImageViewer(comments, setComments);

  console.log({ comments });

  return (
    <Modal
      close={close}
      leftContent={
        <ImageCardHeader
          name={image.name || ''}
          className='text-white space-x-2'
        />
      }
    >
      <div className='p-[20px] flex justify-center items-center h-[calc(100vh-76px)]'>
        <Image
          width={500}
          alt=''
          height={500}
          src={image?.url}
          className='w-[calc(100vw-200px)] h-[calc(100vh-200px)] object-cover rounded-4xl'
          onClick={handleImageClick}
        />
        {comments?.map((comment, index) => (
          <CommentMarker
            key={index}
            comment={comment}
            onClick={() => {
              setIsOpen(true);
              setPosition(
                comment.position ? { ...comment.position, translate: 25 } : null
              );
              setMode('edit');
            }}
            onHover={() => {
              setIsOpen(true);
              setPosition(
                comment.position ? { ...comment.position, translate: 25 } : null
              );
              setMode('view');
              setHoveredComment(comment);
            }}
            onMouseLeave={() => {
              if (mode === 'edit') {
                return;
              }
              setHoveredComment(null);
              setPosition(null);
              setIsOpen(false);
              setMode('new');
            }}
          />
        ))}
        {isOpen && (
          <Popover
            ref={popoverRef}
            style={{
              top: (position?.y ?? 0) + (position?.translate ?? 0),
              left: (position?.x ?? 0) + (position?.translate ?? 0),
            }}
            className={clsx('h-max p-0')}
          >
            {mode === 'view' ? (
              <ViewComment comment={hoveredComment} />
            ) : mode === 'edit' ? (
              <EditComment
                image={image}
                handleCreateReply={handleCreateReply}
                hoveredComment={hoveredComment}
                handleClose={handleEditClose}
              />
            ) : (
              <NewComment
                handleCreateComment={handleCreateComment}
                imageId={image.id || ''}
              />
            )}
          </Popover>
        )}
      </div>
    </Modal>
  );
}
