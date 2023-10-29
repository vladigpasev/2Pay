import SearchElement from '@/components/Search';
import TrendingPage from '../trending/page';

export default async function EmptySearchPage() {
  return (
    <main className='flex justify-center w-full min-h-screen py-10 px-5 max-sm:px-0'>
      <div className='flex flex-col gap-2 p-5 max-w-5xl w-full'>
        <h3 className='w-full text-center text-3xl mb-'>Enter What you are looking?</h3>
        <SearchElement initial={''} />
        <TrendingPage />
      </div>
    </main>
  );
}
