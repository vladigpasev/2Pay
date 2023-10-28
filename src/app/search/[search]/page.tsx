import Compnay from '@/components/Company';
import SearchElement from '@/components/Search';
import { appRouter } from '@/server';

export default async function SearchPage({ params }: { params: { search: string } }) {
  const caller = appRouter.createCaller({
    rawToken: '',
    tokenData: null
  });
  const result = await caller.company.findCompanies({ search: params.search });

  return (
    <main className='flex justify-center w-full min-h-screen py-10 px-5 max-sm:px-0'>
      <div className='flex flex-col gap-2 p-5 max-w-5xl w-full'>
        <SearchElement initial={params.search} />
        <h1 className='font-semibold text-3xl'>Found Companies: </h1>
        <section className='w-full p-1 overflow-auto flex gap-3 pb-4'>
          {result.length > 0 ? (
            <div className='grid grid-cols-3 gap-3'>
              {result.map(company => (
                <Compnay key={company.uuid} company={company} />
              ))}
            </div>
          ) : (
            <h3 className='text-error text-3xl flex mx-auto'>No Companies found!</h3>
          )}
        </section>
        <div className='divider'></div>
        <h1 className='font-semibold text-3xl'>Found Products: </h1>
        <section className='w-full p-1 overflow-auto flex gap-3'></section>
      </div>
    </main>
  );
}
