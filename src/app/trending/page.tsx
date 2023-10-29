import Compnay from '@/components/Company';
import Product from '@/components/Product';
import Products from '@/components/Products';
import SearchElement from '@/components/Search';
import { appRouter } from '@/server';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default async function TrendingPage() {
  const caller = appRouter.createCaller({
    rawToken: '',
    tokenData: null
  });
  const companies = await caller.company.trendingCompanyies();
  const products = await caller.product.trendingProducts();

  return (
    <main className='flex justify-center min-h-screen py-10 px-5 max-sm:px-0'>
      <div className='flex flex-col gap-2 p-5 max-w-5xl w-full'>
        <h1 className='flex w-full text-center mx-auto min-w-full text-5xl font-bold mb-10 text-white py-5 bg-accent'>
          <span className='mx-auto flex'>
            <FontAwesomeIcon icon={faFire} className='h-10 my-auto mr-3' />
            <u className='my-auto'>Trending</u>
          </span>
        </h1>
        <h1 className='font-semibold text-3xl'>Trending Companies: </h1>
        <section className='w-full p-1 overflow-auto flex gap-3 pb-4'>
          {companies.length > 0 ? (
            <div className='grid w-fit mx-auto grid-cols-3 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1'>
              {companies.map(companie => (
                <Compnay key={companie.uuid} company={companie} />
              ))}
            </div>
          ) : (
            <h3 className='text-error text-3xl flex mx-auto'>No Trending Companies!</h3>
          )}
        </section>
        <div className='divider'></div>
        <h1 className='font-semibold text-3xl'>Trneding Products: </h1>
        <section className='w-full p-1 overflow-auto flex gap-3'>
          {products.length > 0 ? (
            <div className='flex min-w-full mx-auto gap-3 max-sm:grid-cols-1'>
              <Products products={products} />
            </div>
          ) : (
            <h3 className='text-error text-3xl flex mx-auto'>No Trending Products!</h3>
          )}
        </section>
      </div>
    </main>
  );
}
