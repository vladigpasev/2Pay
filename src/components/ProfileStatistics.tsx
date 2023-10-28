'use client';

import PageLoading from '@/app/loading';
import { useAuthenticatedQuery } from '@/hooks/useAuthenticatedQuery';
import { PublicCompany } from '@/server/service/company';
import { trpc } from '@/trpc/client';

const error = (
  <h3 className='font-semibold text-3xl w-full text-center text-error'>Something went wrong fetching statistics!</h3>
);

export default function ProfileStatistics({
  companyData,
  productsLength
}: {
  companyData: PublicCompany;
  productsLength: number;
}) {
  // @ts-ignore
  const companieFullData = useAuthenticatedQuery(trpc.company.getRevenue, {
    id: companyData.uuid
  });

  return (
    <div className='stats stats-vertical lg:stats-horizontal shadow w-9/12 mt-10'>
      <>
        <div className='stat'>
          <div className='stat-title'>Products Sold</div>
          <div className='stat-value'>{companyData?.soldItems}</div>
          <div className='stat-desc'>Since Company Creation</div>
        </div>

        <div className='stat'>
          <div className='stat-title'>Revenue</div>
          <div className='stat-value text-primary'>
            {companieFullData.isLoading
              ? 'Loading...'
              : companieFullData.isError
              ? companieFullData.error.message.includes('UNAUTHORIZED')
                ? 'Loading...'
                : error
              : (companieFullData.data as number) + '€'}
          </div>
          <div className='stat-desc'>overall profit</div>
        </div>

        <div className='stat'>
          <div className='stat-title'>Products</div>
          <div className='stat-value'>{productsLength}</div>
          <div className='stat-desc'>up for sale</div>
        </div>
      </>
    </div>
  );
}
