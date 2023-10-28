'use client';

import { useUser } from '@/hooks/useUser';
import CompaniesProfile from './CompaniesProfile';
import UserProfile from './UserProfile';
import ProductsBought from '@/components/ProductsBought';

export default function Profile() {
  const user = useUser();
  return (
    <main className='w-full px-10 max-sm:px-0 min-h-screen product py-10 max-sm:py-0'>
      <div className='flex justify-center align-middle text-neutral-content gap-5 max-[1025px]:flex-col'>
        <UserProfile user={user} />
        <CompaniesProfile user={user} />
      </div>
      <div className='flex justify-center align-middle text-neutral-content gap-5 max-[1025px]:flex-col mt-5'>
        <ProductsBought user={user} />
      </div>
    </main>
  );
}
