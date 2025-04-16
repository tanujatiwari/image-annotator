import { ImageCardHeader } from '@/app/sdk/components';
import Modal from '@/app/sdk/components/modal';
import Popover from '@/app/sdk/components/popover';
import { Comments, ImageComment } from '@/app/sdk/types';
import clsx from 'clsx';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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

  const [flip, setFlip] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!isOpen || !position) return;

    const translate = position.translate ?? 0;
    const anchorX = position.x + translate;
    const anchorY = position.y + translate;

    // wait for popover to render
    requestAnimationFrame(() => {
      const popoverWidth = popoverRef.current?.offsetWidth ?? 250;
      const spaceRight = window.innerWidth - anchorX;

      if (spaceRight < popoverWidth) {
        setCoords({
          top: anchorY,
          left: anchorX - popoverWidth,
        });
        setFlip(true);
      } else {
        setCoords({
          top: anchorY,
          left: anchorX,
        });
        setFlip(false);
      }
    });
  }, [position, isOpen]);

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
      <div className='p-5 flex justify-center items-center h-[calc(100vh-var(--navbar-height))]'>
        <div className='max-w-[calc(100vw-200px)] max-h-[calc(100vh-200px)] h-full w-full rounded-4xl flex items-center justify-center'>
          <Image
            width={500}
            alt=''
            height={500}
            src={image?.url}
            onClick={handleImageClick}
            className='max-w-screen w-max max-h-screen h-full object-contain'
          />
        </div>
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
              top: coords.top,
              left: coords.left,
            }}
            className={clsx('h-max p-0', flip && 'origin-right')}
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
