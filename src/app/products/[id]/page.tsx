import { PublicProduct } from '@/server/service/products';
import { appRouter } from '@/server';

const ERROR = (
  <section className='min-h-screen bg-gradient-to-r from-[#00a54d20] to-secondary flex flex-col justify-center items-center gap-16'>
    <h3 className='font-semibold text-3xl w-full text-center text-error'>No product found with this ID!</h3>
  </section>
);

export default async function ProductPage({ params }: { params: { id: string } }) {
  const caller = appRouter.createCaller({ rawToken: null, tokenData: null });

  let product: PublicProduct;
  try {
    const productResult = await caller.product.get({ id: params.id });
    if (productResult == null) throw new Error('Product is not found!');

    product = productResult;
  } catch (error) {
    return ERROR;
  }

  return (
    <section className='min-h-screen bg-gradient-to-r from-[#00a54d20] to-secondary flex flex-col justify-center items-center gap-16'></section>
  );
}

