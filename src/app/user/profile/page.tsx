'use client';

import { useUser } from '@/hooks/useUser';
import CompaniesProfile from './CompaniesProfile';
import UserProfile from './UserProfile';

export default function Profile() {
  const user = useUser();
  return (
    <main className='w-full px-10 max-sm:px-0 min-h-screen flex justify-center align-middle text-neutral-content py-10 max-sm:py-0 gap-5 max-[1025px]:flex-col'>
      <UserProfile user={user} />
      <CompaniesProfile user={user} />
    </main>
  );
}
