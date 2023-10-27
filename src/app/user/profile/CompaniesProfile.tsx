'use client';

import PageLoading from '@/app/loading';
import { useAuthenticatedQuery } from '@/hooks/useAuthenticatedQuery';
import { useUser } from '@/hooks/useUser';
import { trpc } from '@/trpc/client';
import IUser from '@/types/User';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function CompaniesProfile({ user }: { user: IUser | null }) {
  const companies = trpc.company.getCompaniesOfUser.useQuery({
    uuid: user?.uuid!
  });

  return (
    <section className='flex min-h-[100%] relative flex-grow w-full rounded-xl border border-neutral mx-auto bg-neutral gap-10 min-w-[450px] max-md:min-w-min max-sm:w-full max-sm:min-h-screen max-sm:rounded-none'>
      {companies.isLoading ? (
        <PageLoading />
      ) : (
        <div className='flex h-full my-auto flex-grow w-full text-start flex-col mx-auto py-10 gap-10 px-8 max-sm:py-16'>
          <h1 className='text-3xl font-bold'>
            <u>Your companies: </u>
          </h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            {companies.data && companies.data.length > 0 ? (
              <>
                {companies.data.map((company, index) => (
                  <Link
                    href={`/companies/${company.uuid}`}
                    key={index}
                    className='bg-[#00b65e0d] p-2 px-3 rounded-xl transition-transform transform hover:scale-105 cursor-pointer'
                  >
                    <div className='flex items-start gap-2'>
                      <img
                        src={company.logoURL || '/images/pngs/company.jpg'}
                        alt={company.name}
                        className='w-12 h-12 rounded-full object-cover mr-2 border-2 border-indigo-200 my-auto'
                      />
                      <div className='flex-1 min-w-0'>
                        <h2 className='text-md font-semibold text-base-content truncate'>{company.name}</h2>
                        <p className='text-xs text-gray-500 mt-0.5 line-clamp-3 overflow-hidden'>
                          {company.description}
                        </p>
                        <a
                          href={`mailto:${company.contactEmail}`}
                          className='text-[#00b65eb4] text-xs hover:underline mt-0.5 block truncate overflow-hidden'
                        >
                          {company.contactEmail}
                        </a>
                      </div>
                    </div>
                  </Link>
                ))}
                <Link
                  href='/companies/create'
                  className='bg-accent p-2 rounded-xl transition-transform transform hover:scale-105 cursor-pointer flex items-center justify-center'
                >
                  <span className='text-2xl font-bold mr-3 my-auto'>+</span>
                  <span className='my-auto'>New Company</span>
                </Link>
              </>
            ) : (
              <div className='flex w-full h-full'>
                <div className='flex mx-auto my-auto flex-col p-10 gap-3'>
                  <h3 className='text-xl font-semibold text-center'>
                    You are not connected to any <strong>Companies</strong>!
                  </h3>
                  <Link
                    href='/companies/create'
                    className='flex flex-row gap-10 max-sm:gap-5 btn btn-primary rounded-lg w-fit mx-auto pr-10 max-sm:pr-5 min-w-fit'
                  >
                    <FontAwesomeIcon icon={faPlusCircle} size='2x' className='-ml-2 my-auto' />
                    <span className='flex-grow font-bold my-auto max-sm:text-sm'>Create Company</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
