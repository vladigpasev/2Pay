import { trpc } from '@/trpc/client';
import IUser from '@/types/User';
import { faBasketShopping, faHandHoldingDollar, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Products from './Products';
import PageLoading from '@/app/loading';
import { useAuthenticatedQuery } from '@/hooks/useAuthenticatedQuery';
import { ListedProduct } from '@/server/service/products';
import Link from 'next/link';

interface ProductsSoldReturnType {
  date: Date;
  uuid: string;
  price: number;
  buyerUuid: string;
  sellerUuid: string;
  productImageUrl: string | null;
  productName: string;
  productDescription: string;
  buyer: IUser;
}

export default function ProductsSold({ user }: { user: IUser | null }) {
  // @ts-ignore
  const getBoughtProducts = useAuthenticatedQuery<>(trpc.transaction.userSellings, {});

  return (
    <div className='flex flex-col gap-5 p-10 max-sm:px-3 rounded-2xl bg-neutral w-full flex-grow'>
      <h1 className='font-semibold text-[1.8rem]'>
        <FontAwesomeIcon icon={faHandHoldingDollar} /> <u>Your Sales</u>
      </h1>
      <div className='flex gap-3 p-5 max-sm:px-0 relative'>
        {getBoughtProducts.isLoading ? (
          <div className='min-h-[200px]'>
            <PageLoading />
          </div>
        ) : getBoughtProducts.isError || (getBoughtProducts.data as ProductsSoldReturnType[]).length! < 1 ? (
          <h3 className='text-center font-semibold text-xl w-full'>
            You have not sold anything yet! <FontAwesomeIcon icon={faSackDollar} />
          </h3>
        ) : (
          <div className='w-full overflow-auto flex flex-wrap justify-between overflow-x-hidden'>
            {(getBoughtProducts.data as ProductsSoldReturnType[]).map(product => (
              <div key={product.uuid} className='card card-normal min-[1200px]:card-side bg-base-100 shadow-xl mb-6 min-w-full'>
                <figure className='w-full min-h-full bg-red-300 max-w-[185px] max-[1200px]:max-w-full'>
                  <img
                    src={product.productImageUrl || 'images/pngs/product.png'}
                    alt={product.productName}
                    className='cursor-pointer w-full object-cover h-full'
                  />
                </figure>
                <div className='card-body mt-4 xl-max:mt-0'>
                  <div className='flex flex-row gap-3 justify-between max-md:flex-col'>
                    <div className='flex flex-col'>
                      <div className='flex justify-between'>
                        <h2 className='card-title'>{product.productName}</h2>
                        {/* Тук се показва броя продадени единици */}
                      </div>
                      <p>{product.productDescription}</p>
                      <div className='flex flex-row card-actions space-x-2 items-center justify-between sm:flex-row sm:space-x-2 sm:space-y-0 space-y-2'>
                        <span className='text-2xl my-auto font-semibold text-base-content p-0.5 px-2 rounded bg-base-200'>
                          {product.price}€
                        </span>
                      </div>
                    </div>
                    <div className='h-full border-l border-l-primary'></div>
                    <div className='flex flex-col gap-2 pl-3 my-auto'>
                      <div className='flex gap-2'>
                        <img
                          src={product.buyer.profilePictureURL}
                          alt='your buyer'
                          className='w-10 h-10 rounded-full my-auto border border-accent'
                        />
                        <div className='flex flex-col gap-1'>
                          <p className='flex text-lg font-bold'>{product.buyer.name}</p>
                          <p className='flex'>{product.buyer.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
