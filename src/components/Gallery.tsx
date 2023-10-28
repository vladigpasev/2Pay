'use client';
import React, { useState } from 'react';
import { useCloseModal } from './utils/Modal';

interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const closeModal = useCloseModal();

  const nextImage = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className='relative w-full h-[100%] rounded-md' onClick={e => e.stopPropagation()}>
      <img
        src={images[currentIndex]}
        alt={`Gallery Image ${currentIndex}`}
        className='w-full h-full object-cover rounded'
      />
      <button
        onClick={() => closeModal()}
        className='absolute top-2 right-2 p-2 bg-white bg-opacity-70 hover:bg-opacity-80 rounded-full text-black transition-colors'
      >
        X
      </button>
      <button
        onClick={prevImage}
        className='absolute left-2 top-1/2 transform -translate-y-50% p-4 bg-white bg-opacity-70 hover:bg-opacity-80 rounded-full text-black'
      >
        &#10094;
      </button>
      <button
        onClick={nextImage}
        className='absolute right-2 top-1/2 transform -translate-y-50% p-4 bg-white bg-opacity-70 hover:bg-opacity-80 rounded-full text-black'
      >
        &#10095;
      </button>
    </div>
  );
};

export default Gallery;
