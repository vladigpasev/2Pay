'use client';

import PageLoading from '@/app/loading';
import { useAuthenticatedQuery } from '@/hooks/useAuthenticatedQuery';
import { PublicCompany } from '@/server/service/company';
import { PublicProduct } from '@/server/service/products';
import { trpc } from '@/trpc/client';

const error = (
  <h3 className='font-semibold text-3xl w-full text-center text-error'>Something went wrong fetching statistics!</h3>
);

export default function ProductStats({ productData }: { productData: PublicProduct }) {
  // @ts-ignore
  const productRevenueReq = useAuthenticatedQuery(trpc.product.getRevenue, {
    id: productData.uuid
  });

  return (
    <div className='stats stats-vertical lg:stats-horizontal shadow'>
      <>
        <div className='stat'>
          <div className='stat-title'>Amount Sold</div>
          <div className='stat-value'>{productData.amountSold}</div>
          <div className='stat-desc'>Since Product Creation</div>
        </div>

        <div className='stat'>
          <div className='stat-title'>Revenue</div>
          <div className='stat-value text-primary'>
            {productRevenueReq.isLoading
              ? 'Loading...'
              : productRevenueReq.isError
              ? productRevenueReq.error.message.includes('UNAUTHORIZED')
                ? 'Loading...'
                : error
              : (productRevenueReq.data as number) + '€'}
          </div>
          <div className='stat-desc'>overall profit</div>
        </div>
      </>
    </div>
  );
}
