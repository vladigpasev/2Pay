import Products from '@/components/Products';
import { useUserServer, useUserServerNoExpiration } from '@/hooks/useUserServer';
import { appRouter } from '@/server';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

async function CompanyInfo({ params }: { params: { id: string } }) {
  const caller = appRouter.createCaller({
    rawToken: '',
    tokenData: null
  });
  const user = useUserServerNoExpiration();
  const companyData = await caller.company.get({ id: params.id });
  const products = await caller.product.getProductsOfCompany({ uuid: params.id });

  let revenue = 0;
  if (companyData?.creatorUuid === user?.uuid) {
    try {
      revenue = await caller.product.getRevenue({ id: params.id });
    } catch (error) {}
  }

  return (
    <section className='min-h-screen bg-gradient-to-r from-[#00a54d20] to-secondary flex flex-col justify-center items-center gap-16'>
      {companyData?.creatorUuid === user?.uuid && (
        <>
          <Link
            href={`/companies/update/${params.id}`}
            className='absolute top-2 right-2 rounded-lg aspect-square bg-accent cursor-pointer p-2'
          >
            <FontAwesomeIcon icon={faEdit} className='w-5 h-5' />
          </Link>
          <div className='stats stats-vertical lg:stats-horizontal shadow w-9/12 mt-10'>
            <div className='stat'>
              <div className='stat-title'>Products Sold</div>
              <div className='stat-value'>{companyData?.soldItems}</div>
              <div className='stat-desc'>Since Company Creation</div>
            </div>

            <div className='stat'>
              <div className='stat-title'>Revenue</div>
              <div className='stat-value text-primary'>{revenue}€</div>
              <div className='stat-desc'>overall profit</div>
            </div>

            <div className='stat'>
              <div className='stat-title'>Products</div>
              <div className='stat-value'>{products.length}</div>
              <div className='stat-desc'>up for sale</div>
            </div>
          </div>
        </>
      )}
      <div className='flex flex-col md:flex-row items-center justify-center'>
        <div className='w-full md:w-1/2 p-8 flex flex-col items-center justify-center border-r-2 md:border-b-0 border-[#00a54d56]'>
          <div className='text-center'>
            <img
              src={companyData?.logoURL || '/images/pngs/company.jpg'}
              alt='Company Logo'
              className='w-40 h-40 md:w-52 md:h-52 rounded-full mx-auto border-4 border-[#00a54d56] shadow-xl'
            />
            <h1 className='mt-6 text-3xl md:text-4xl font-bold text-primary w-full text-center flex'>
              <span className='mx-auto flex gap-3'>
                {companyData?.name}{' '}
                <span className='py-0.5 px-1.5 w-fit rounded pb-1 border border-base-content flex flex-col'>
                  <p className='text-[0.5rem] mx-auto leading-3'>Items Sold:</p>
                  <p className='text-[2rem] font-extrabold mx-auto leading-5 text-accent'>{companyData?.soldItems}</p>
                </span>
              </span>
            </h1>
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
          {user?.uuid === companyData?.creatorUuid && (
            <Link
              href={`/products/create/${companyData?.uuid}`}
              className='btn btn-primary h-full px-5 flex justify-center w-full max-w-xs mx-auto '
            >
              <FontAwesomeIcon size='sm' className='py-auto h-4 mr-1' icon={faPlus} />
              <span className='my-auto'>Create Product</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default CompanyInfo;
