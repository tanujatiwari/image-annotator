import { POPOVER_HEIGHT, POPOVER_WIDTH } from '@/app/sdk/constants';
import useHandleClickOutside from '@/app/sdk/hooks/useHandleClickOutside';
import { Comments, ImageComment, Position } from '@/app/sdk/types';
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { v4 as generateUUID } from 'uuid';

export default function useImageViewer(
  comments?: ImageComment[],
  setComments?: Dispatch<SetStateAction<Comments | undefined>>
) {
  const [position, setPosition] = useState<Position | null>(null);
  const { isOpen, ref: popoverRef, setIsOpen } = useHandleClickOutside();
  const [mode, setMode] = useState<'view' | 'edit' | 'new'>('new');
  const [hoveredComment, setHoveredComment] = useState<ImageComment | null>(
    null
  );

  const handleImageClick = (e: MouseEvent) => {
    if (
      e.clientX >= (position?.x ?? 0) &&
      e.clientX <= (position?.x ?? 0) + POPOVER_WIDTH &&
      e.clientY >= (position?.y ?? 0) &&
      e.clientY <= (position?.y ?? 0) + POPOVER_HEIGHT
    ) {
      return;
    }
    setIsOpen(true);
    setPosition({ x: e.clientX, y: e.clientY });
    setMode('new');
    setHoveredComment(null);
  };

  const handleCreateComment = (imageId: string, input: string) => {
    if (!imageId) return;

    setComments?.((p) => ({
      ...(p || {}),
      [imageId]: [
        ...(p?.[imageId] || []),
        {
          comment: input,
          replies: [],
          position: position || undefined,
          timestamp: new Date(),
          author: {
            name: 'Tanuja',
          },
          commentId: generateUUID(),
        },
      ],
    }));
    setIsOpen(false);
  };

  const handleCreateReply = (imageId: string, input: string) => {
    if (!imageId || !comments) return;

    setComments?.((p) => ({
      ...(p || {}),
      [imageId]:
        p?.[imageId]?.map((comment) => {
          if (comment.commentId === hoveredComment?.commentId) {
            return {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  author: {
                    name: 'Tanuja',
                  },
                  comment: input,
                  commentId: generateUUID(),
                  timestamp: new Date(),
                  replies: [],
                },
              ],
            };
          } else {
            return comment;
          }
        }) || [],
    }));

    setIsOpen(false);
  };

  const handleEditClose = () => {
    setMode('new');
    setPosition(null);
    setIsOpen(false);
  };

  return {
    position,
    setPosition,
    isOpen,
    popoverRef,
    setIsOpen,
    handleImageClick,
    handleCreateComment,
    mode,
    handleCreateReply,
    setMode,
    hoveredComment,
    setHoveredComment,
    handleEditClose,
  };
}
