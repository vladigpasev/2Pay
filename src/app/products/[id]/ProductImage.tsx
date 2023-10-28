'use client';

import { useOpenModal } from '@/components/utils/Modal';
import Gallery from '@/components/Gallery';

export function ProductImage({ images }: { images: string[] }) {
  const openModal = useOpenModal();

  return (
    <img
      src={images[0]}
      onClick={() => openModal(<Gallery images={images} />, () => {})}
      className='rounded-xl max-w-[400px] max-sm:w-full aspect-square cursor-pointer'
    />
  );
}
