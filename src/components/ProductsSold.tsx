import { trpc } from '@/trpc/client';
import IUser from '@/types/User';
import { faBasketShopping, faHandHoldingDollar, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Products from './Products';
import PageLoading from '@/app/loading';
import { useAuthenticatedQuery } from '@/hooks/useAuthenticatedQuery';
import { ListedProduct } from '@/server/service/products';

export default function ProductsSold({ user }: { user: IUser | null }) {
  // @ts-ignore
  const getBoughtProducts = useAuthenticatedQuery(trpc.transaction.userSellings, {});

  return (
    <div className='flex flex-col gap-5 p-10 max-sm:px-3 rounded-2xl bg-neutral w-full flex-grow'>
      <h1 className='font-semibold text-[1.8rem]'>
        <FontAwesomeIcon icon={faHandHoldingDollar} /> <u>Products Sold by You</u>
      </h1>
      <div className='flex gap-3 p-5 max-sm:px-0 relative'>
        {getBoughtProducts.isLoading ? (
          <PageLoading />
        ) : getBoughtProducts.isError || (getBoughtProducts.data as ListedProduct[]).length! < 1 ? (
          <h3 className='text-center font-semibold text-xl w-full'>
            You have not sold anything yet! <FontAwesomeIcon icon={faSackDollar} />
          </h3>
        ) : (
          <Products products={getBoughtProducts.data as ListedProduct[]} />
        )}
      </div>
    </div>
  );
}
