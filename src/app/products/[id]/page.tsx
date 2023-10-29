import { PublicProduct } from '@/server/service/products';
import { appRouter } from '@/server';
import { useUserServerNoExpiration } from '@/hooks/useUserServer';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import ProductStats from '@/components/ProductStats';
import { ProductImage } from './ProductImage';
import { BuyButtons } from './BuyButtons';

const ERROR = (
  <section className='min-h-screen bg-gradient-to-r from-[#00a54d20] to-secondary flex flex-col justify-center items-center gap-16'>
    <h3 className='font-semibold text-3xl w-full text-center text-error'>No product found with this ID!</h3>
  </section>
);

export default async function ProductPage({ params }: { params: { id: string } }) {
  const caller = appRouter.createCaller({ rawToken: null, tokenData: null });
  const user = useUserServerNoExpiration();

  let product: PublicProduct;
  try {
    const productResult = await caller.product.get({ id: params.id });
    if (productResult == null) throw new Error('Product is not found!');

    product = productResult;
  } catch (error) {
    return ERROR;
  }

  const company = (await caller.company.get({ id: product.companyUuid }))!;

  return (
    <section className='min-h-screen bg-gradient-to-r from-[#00a54d20] to-secondary flex flex-col items-center py-10'>
      {company.creatorUuid === user?.uuid && (
        <>
          <Link
            href={`/products/update/${params.id}`}
            className='absolute top-2 right-2 rounded-lg aspect-square bg-accent cursor-pointer p-2'
          >
            <FontAwesomeIcon icon={faEdit} className='w-5 h-5' />
          </Link>
          <ProductStats productData={product} />
        </>
      )}
      <div className='flex flex-row items-center grow'>
        <div className='flex flex-row max-md:flex-col max-md:items-center px-10 gap-10 mt-8'>
          <ProductImage images={[product.pictureURL, ...(product.galleryJSON ?? [])]} />
          <div className='flex flex-col text-left justify-between max-w-3xl'>
            <div className='flex flex-col gap-2 text-left'>
              <div className='flex flex-row gap-4 items-center'>
                <p className='text-5xl w-fit'>{product.name}</p>
                <span className='py-0.5 px-1.5 rounded pb-1 border border-base-content flex flex-col'>
                  <p className='text-[0.85rem] mt-1 mx-auto leading-3'>Sold:</p>
                  <p className='text-[1.75rem] pt-1 mb-1 font-extrabold mx-auto leading-5 text-accent'>
                    {product.amountSold}
                  </p>
                </span>
              </div>
              <p className='text-xl text-gray-400'>{product.description}</p>
            </div>
            <div className='flex flex-row gap-4 items-center max-md:justify-between mb-5 mt-5'>
              <p className='text-3xl text-accent'>{product.price.toFixed(2)}€</p>
              <BuyButtons enabled={company.creatorUuid !== user?.uuid} product={product} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

