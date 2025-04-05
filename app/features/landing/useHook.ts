import { Comments, Image } from '@/app/sdk/types';
import { ChangeEvent, useMemo, useState } from 'react';
import { v4 as generateUUID } from 'uuid';

export default function useHook() {
  const [images, setImages] = useState<Image[]>([]);
  const [comments, setComments] = useState<Comments>();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.files) {
      return;
    }
    const images: Image[] = Array.from(e.target?.files)?.map((file) => ({
      image: file,
      imageId: generateUUID(),
      isSelected: false,
    }));
    setImages(images);
  };

  const selectedImageOnModal = useMemo(() => {
    const image = images?.find((img) => img?.isSelected);
    return {
      url: image?.image ? URL.createObjectURL(image?.image) : '',
      name: image?.image?.name,
      isSelected: Boolean(image),
      id: image?.imageId,
    };
  }, [images]);

  const handleImageCardClick = (imageId: string) => {
    setImages((prev) =>
      prev.map((image) =>
        image.imageId === imageId ? { ...image, isSelected: true } : image
      )
    );
  };

  return {
    images,
    setImages,
    comments,
    setComments,
    handleInputChange,
    handleImageCardClick,
    selectedImageOnModal,
  };
}
