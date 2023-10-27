import CompaniesProfile from './CompaniesProfile';
import UserProfile from './UserProfile';

export default function Profile() {
  return (
    <main className='w-full px-10 max-sm:px-0 min-h-screen flex justify-center align-middle text-neutral-content py-10 max-sm:py-0 gap-5 max-[1025px]:flex-col'>
      <UserProfile />
      <CompaniesProfile />
    </main>
  );
}
