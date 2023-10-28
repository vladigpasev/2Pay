import Products from '@/components/Products';
import { appRouter } from '@/server';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

async function CompanyInfo({ params }: { params: { id: string } }) {
  const caller = appRouter.createCaller({
    rawToken: '',
    tokenData: null
  });
  const companyData = await caller.company.get({ id: params.id });
  const products = await caller.product.getProductsOfCompany({ uuid: params.id });

  return (
    <div className='flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-[#00a54d20] to-secondary'>
      <div className='w-full md:w-1/2 p-8 flex flex-col items-center justify-center border-r-2 md:border-b-0 border-[#00a54d56]'>
        <div className='text-center'>
          <img
            src={companyData?.logoURL || '/images/pngs/company.jpg'}
            alt='Company Logo'
            className='w-40 h-40 md:w-52 md:h-52 rounded-full mx-auto border-4 border-[#00a54d56] shadow-xl'
          />
          <h1 className='mt-6 text-3xl md:text-4xl font-bold text-primary'>{companyData?.name}</h1>
          <a
            href={`mailto:${companyData?.contactEmail}`}
            className='text-md md:text-lg text-primary hover:text-accent hover:underline mt-2 block'
          >
            {companyData?.contactEmail}
          </a>
          <p className='mt-4 text-md md:text-lg text-description max-w-2xl mx-auto'>{companyData?.description}</p>
        </div>
      </div>
      <div className='w-full md:w-1/2 p-8'>
        <Products products={products} />
        <Link
          href={`/products/create`}
          className='btn btn-primary h-full px-5 flex justify-center w-full max-w-xs mx-auto '
        >
          <FontAwesomeIcon size='sm' className='py-auto h-4 mr-1' icon={faPlus} />
          <span className='my-auto'>Create Product</span>
        </Link>
      </div>
    </div>
  );
}

export default CompanyInfo;
