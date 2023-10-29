'use client';

import { ListedProduct, ProductInfo } from '@/server/service/products';
import { trpc } from '@/trpc/client';
import React, { useState } from 'react';
import { useOpenModal } from './utils/Modal';
import Gallery from './Gallery';
import Link from 'next/link';

interface ProductProps {
  product: ListedProduct;
  dontShowRight?: boolean;
}

const Product: React.FC<ProductProps> = ({ product, dontShowRight }) => {
  const productDetails = trpc.product.get.useQuery({ id: product.uuid }, { enabled: false, refetchOnMount: false });
  const [isModalOpened, setIsModalOpended] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const openModal = useOpenModal();

  if (productDetails.isFetched && !isModalOpened && isClicked) {
    const images = [product.pictureURL];
    images.push(...(productDetails.data?.galleryJSON || []));
    setIsModalOpended(true);
    setIsClicked(false);
    setTimeout(() => openModal(<Gallery images={images} />, () => setIsModalOpended(false)), 0);
  }

  const getProductDetails = () => {
    productDetails.refetch();
    setIsClicked(true);
  };

  return (
    <div className='card card-normal min-[1200px]:card-side bg-base-100 shadow-xl mb-6'>
      <figure className='w-full min-h-full bg-red-300 max-w-[185px] max-[1200px]:max-w-full'>
        <img
          src={product.pictureURL}
          alt={product.name}
          className='cursor-pointer w-full object-cover h-full'
          onClick={() => getProductDetails()}
        />
      </figure>
      <div className='card-body mt-4 xl-max:mt-0'>
        <div className='flex justify-between'>
          <h2 className='card-title'>{product.name}</h2>
          {!dontShowRight && (
            <span className='py-0.5 px-1.5 rounded pb-1 border border-base-content flex flex-col'>
              <p className='text-[0.6rem] mx-auto leading-3'>Sold:</p>
              <p className='text-[1.5rem] font-extrabold mx-auto leading-5 text-accent'>{product.amountSold}</p>
            </span>
          )}
          {/* Тук се показва броя продадени единици */}
        </div>
        <p>{product.description}</p>
        <div className='flex flex-row card-actions space-x-2 items-center justify-between sm:flex-row sm:space-x-2 sm:space-y-0 space-y-2'>
          <span className='text-2xl my-auto font-semibold text-base-content p-0.5 px-2 rounded bg-base-200'>
            {product.price}€
          </span>
          <div className='flex flex-row gap-3 my-auto'>
            {!dontShowRight && (
              <Link href={`/products/${product.uuid}`} className='btn btn-primary'>
                Details
              </Link>
            )}
            {/* <button className="btn btn-outline">Edit</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
