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
    <div className='bg-gray-100 w-screen relative'>
      <nav className='bg-white h-[72px] flex items-center p-10'>
        <p className='font-bold'>Folder</p>
      </nav>
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
      <main>
        <section className='p-10'>
          {images?.length ? (
            <div className='grid grid-cols-5 gap-10'>
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
        </section>
      </main>
    </div>
  );
}
