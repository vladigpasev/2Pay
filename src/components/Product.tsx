import React from 'react';

interface ProductProps {
  product: {
    title: string;
    description: string;
    price: string;
    mainImage: string;
    gallery: string[];
    soldCount: number;
  };
  setActiveGallery: (gallery: string[] | null) => void;
}

const Product: React.FC<ProductProps> = ({ product, setActiveGallery }) => {
  return (
    <div className='card card-normal min-[1200px]:card-side bg-base-100 shadow-xl mb-6'>
      <figure className='w-full min-h-full bg-red-300 max-w-[185px] max-[1200px]:max-w-full'>
        <img
          src={product.mainImage}
          alt={product.title}
          className='cursor-pointer w-full object-cover h-full'
          onClick={() => setActiveGallery([...product.gallery])}
        />
      </figure>
      <div className='card-body mt-4 xl-max:mt-0'>
        <div className='flex justify-between'>
          <h2 className='card-title'>{product.title}</h2>
          <span className='py-0.5 px-1.5 rounded pb-1 border border-base-content flex flex-col'>
            <p className='text-[0.5rem] mx-auto leading-3'>Items Sold:</p>
            <p className='text-[1.5rem] font-extrabold mx-auto leading-5 text-accent'>10</p>
          </span>
          {/* Тук се показва броя продадени единици */}
        </div>
        <p>{product.description}</p>
        <div className='flex flex-row card-actions space-x-2 items-center justify-between sm:flex-row sm:space-x-2 sm:space-y-0 space-y-2'>
          <span className='text-lg font-semibold'>{product.price}</span>
          <div className='flex flex-row gap-3'>
            <button className='btn btn-primary'>Details</button>
            {/* <button className="btn btn-outline">Edit</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
