import IUser from '@/types/User';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ProductsBought({ user }: { user: IUser | null }) {
  return (
    <div className='flex flex-col gap-5 p-10 max-sm:px-3 rounded-2xl bg-neutral w-full flex-grow'>
      <h1 className='font-semibold text-[1.8rem]'>
        <FontAwesomeIcon icon={faBasketShopping} /> <u>Products Bought by You</u>
      </h1>
    </div>
  );
}
