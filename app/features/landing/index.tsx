'use client';

import ImageCard from '@/app/sdk/components/imageCard';
import EmptyState from './EmptyState';
import ImageViewer from './ImageViewer';
import useHook from './useHook';

export default function Landing() {
  const {
    images,
    handleInputChange,
    handleImageCardClick,
    selectedImageOnModal,
    setImages,
    comments,
    setComments,
  } = useHook();
  return (
    <main className='my-auto h-full'>
      {selectedImageOnModal?.isSelected ? (
        <ImageViewer
          close={() =>
            setImages((p) => p.map((p) => ({ ...p, isSelected: false })))
          }
          image={selectedImageOnModal}
          comments={comments?.[selectedImageOnModal?.id || '']}
          setComments={setComments}
        />
      ) : null}
      {images?.length ? (
        <div className='grid lg:grid-cols-5 gap-10 sm:grid-cols-3 grid-cols-1 p-10'>
          {images.map(({ image, imageId }) => {
            const url = URL.createObjectURL(image);
            return (
              <ImageCard
                key={imageId}
                name={image.name}
                url={url}
                onClick={() => handleImageCardClick(imageId)}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState handleInputChange={handleInputChange} />
      )}
    </main>
  );
}
