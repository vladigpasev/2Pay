'use client';
import React, { useState } from 'react';
import Product from '@/components/Product';
import Gallery from './Gallery';
import { ListedProduct } from '@/server/service/products';

function Products({ products }: { products: ListedProduct[] }) {
  return (
    <div className='sm:max-h-[calc(100vh-64px)] p-4 max-sm:p-0 space-y-6 sm:overflow-y-auto w-full'>
      {products.map((product, idx) => (
        <Product key={idx} product={product} />
      ))}
    </div>
  );
}

export default Products;
