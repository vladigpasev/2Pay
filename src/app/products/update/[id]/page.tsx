'use client';

import PageLoading from '@/app/loading';
import CompanyForm, { ICompany } from '@/components/CompanyForm';
import ProductForm from '@/components/ProductForm.';
import { trpc } from '@/trpc/client';

export default function UpdateProduct({ params }: { params: { id: string } }) {
  const id = params.id;
  const product = trpc.product.get.useQuery({
    id: id
  });
  if (product.isLoading) return <PageLoading />;
  if (product.isError)
    return (
      <main className='flex w-full min-h-screen justify-center'>
        <h1 className='text-error font-semibold text-3xl flex my-auto'>Something went wrong! Try again Later!</h1>
      </main>
    );
  if (!product.data)
    return (
      <main className='flex w-full min-h-screen justify-center'>
        <h1 className='text-error font-semibold text-3xl flex my-auto'>No compnay found with this ID!</h1>
      </main>
    );
  return <ProductForm companyUuid={product.data.companyUuid} type='update' product={product.data} id={id} />;
}
