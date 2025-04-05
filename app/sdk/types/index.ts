export type Image = {
  imageId: string;
  image: File;
  isSelected: boolean;
};

export type Position = { x: number; y: number; translate?: number };

export interface ImageComment {
  comment: string;
  commentId: string;
  author: {
    name: string;
  };
  position?: Position;
  replies: ImageComment[];
  timestamp: Date;
}

export type Comments = {
  [key: string]: ImageComment[];
};
