'use client';

import PageLoading from '@/app/loading';
import CompanyForm, { ICompany } from '@/components/CompanyForm';
import { trpc } from '@/trpc/client';

export default function UpdateCompanie({ params }: { params: { id: string } }) {
  const id = params.id;
  const company = trpc.company.get.useQuery({
    id: id
  });
  if (company.isLoading) return <PageLoading />;
  if (company.isError)
    return (
      <main className='flex w-full min-h-screen justify-center'>
        <h1 className='text-error font-semibold text-3xl flex my-auto'>Something went wrong! Try again Later!</h1>
      </main>
    );
  if (!company.data)
    return (
      <main className='flex w-full min-h-screen justify-center'>
        <h1 className='text-error font-semibold text-3xl flex my-auto'>No compnay found with this ID!</h1>
      </main>
    );
  return (
    <CompanyForm
      type='update'
      company={
        {
          ...company.data,
          id: company.data?.uuid || ''
        } as ICompany
      }
    />
  );
}
