import { trpc } from '@/trpc/client';
import IUser from '@/types/User';
import { faBasketShopping, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Products from './Products';
import PageLoading from '@/app/loading';
import { useAuthenticatedQuery } from '@/hooks/useAuthenticatedQuery';
import { ListedProduct, ProductInfo } from '@/server/service/products';

export default function ProductsBought({ user }: { user: IUser | null }) {
  // @ts-ignore
  const getBoughtProducts = useAuthenticatedQuery(trpc.transaction.userBuyings, {});

  return (
    <div className='flex flex-col gap-5 p-10 max-sm:px-3 rounded-2xl bg-neutral w-full flex-grow'>
      <h1 className='font-semibold text-[1.8rem]'>
        <FontAwesomeIcon icon={faBasketShopping} /> <u>Your Purchases</u>
      </h1>
      <div className='flex gap-3 p-5 max-sm:px-0 relative'>
        {getBoughtProducts.isLoading ? (
          <PageLoading />
        ) : getBoughtProducts.isError || (getBoughtProducts.data as ProductInfo[]).length! < 1 ? (
          <h3 className='text-center font-semibold text-xl w-full'>
            You have not buyed anything yet! <FontAwesomeIcon icon={faSackDollar} />
          </h3>
        ) : (
          <Products products={getBoughtProducts.data as ListedProduct[]} dontShowRight={true} />
        )}
      </div>
    </div>
  );
}
