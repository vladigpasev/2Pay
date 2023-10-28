'use client';
import React, { useState } from 'react';
import Product from '@/components/Product';
import Gallery from './Gallery';
import { ListedProduct } from '@/server/service/products';

function Products({ products }: { products: ListedProduct[] }) {
  const [activeGallery, setActiveGallery] = useState<string[] | null>(null);

  const closeGallery = () => {
    setActiveGallery(null);
  };

  return (
    <div className='sm:max-h-[calc(100vh-64px)] p-10 max-sm:p-0 space-y-6 sm:overflow-y-auto'>
      {products.map((product, idx) => (
        <Product key={idx} product={product} setActiveGallery={setActiveGallery} />
      ))}

      {activeGallery && <Gallery images={activeGallery} closeGallery={closeGallery} />}
    </div>
  );
}

export default Products;
