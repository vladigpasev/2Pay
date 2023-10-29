import { trpc } from '@/trpc/client';
import IUser from '@/types/User';
import { faBasketShopping, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Products from './Products';

export default function ProductsBought({ user }: { user: IUser | null }) {
  const getBoughtProducts = trpc.transaction.userBuyings.useQuery();

  return (
    <div className='flex flex-col gap-5 p-10 max-sm:px-3 rounded-2xl bg-neutral w-full flex-grow'>
      <h1 className='font-semibold text-[1.8rem]'>
        <FontAwesomeIcon icon={faBasketShopping} /> <u>Products Bought by You</u>
      </h1>
      <div className='flex gap-3 p-3'>
        {getBoughtProducts.isError || getBoughtProducts.data?.length || 0 < 1 ? (
          <h3 className='text-center font-semibold text-xl w-full'>
            You have not buyed anything yet! <FontAwesomeIcon icon={faSackDollar} />
          </h3>
        ) : (
          <>{getBoughtProducts.data!}</>
        )}
      </div>
    </div>
  );
}
