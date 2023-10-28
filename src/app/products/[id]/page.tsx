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
    <section className='min-h-screen bg-gradient-to-r from-[#00a54d20] to-secondary flex flex-col justify-center items-center gap-16'>
      <div className='flex flex-row max-md:flex-col max-md:items-center px-10 gap-10 mt-8'>
        <img src={product.pictureURL} className='rounded-xl max-w-[400px] max-sm:w-full aspect-square' />
        <div className='flex flex-col text-left justify-between max-w-3xl'>
          <div className='flex flex-col gap-2 text-left'>
            <div className='flex flex-row gap-4 items-center'>
              <p className='text-5xl w-fit'>This is a long product name</p>
              <span className='py-0.5 px-1.5 rounded pb-1 border border-base-content flex flex-col'>
                <p className='text-[0.85rem] mt-1 mx-auto leading-3'>Sold:</p>
                <p className='text-[1.75rem] pt-1 mb-1 font-extrabold mx-auto leading-5 text-accent'>1000</p>
              </span>
            </div>
            <p className='text-xl text-gray-400'>
              words words words words words words words words words words words words words words words words words
              words words words words words words words words words words words words words words words words words
              words words words words words words words words words words{' '}
            </p>
          </div>
          <div className='flex flex-row gap-4 items-center max-md:justify-between mb-5 mt-5'>
            <p className='text-3xl text-accent'>1000.69€</p>
            <p className='text-2xl bg-accent w-fit text-white px-10 pt-1 pb-2 rounded-lg'>Buy</p>
          </div>
        </div>
      </div>
    </section>
  );
}
