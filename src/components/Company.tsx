'use client';

import { Company } from '@/server/service/company';
import { index } from 'drizzle-orm/mysql-core';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Compnay({ company }: { company: Company }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/companies/${company.uuid}`)}
      className='bg-[#00b65e0d] p-2 px-3 rounded-xl min-w-fit transition-transform transform hover:scale-[1.02] cursor-pointer relative'
    >
      <div className='flex items-start gap-2 max-w-sm'>
        <img
          src={company.logoURL || '/images/pngs/company.jpg'}
          alt={company.name}
          className='w-12 h-12 rounded-full object-cover mr-2 border-2 border-indigo-200 my-auto'
        />
        <div className='flex-1 min-w-0'>
          <h2 className='text-md font-semibold text-base-content truncate'>{company.name}</h2>
          <p className='text-xs text-gray-500 mt-0.5 line-clamp-3 overflow-hidden'>{company.description}</p>
          <a
            href={`mailto:${company.contactEmail}`}
            className='text-[#00b65eb4] text-xs hover:underline mt-0.5 block truncate overflow-hidden'
          >
            {company.contactEmail}
          </a>
        </div>
      </div>
      <span className='absolute top-0 right-0 pt-0.5 pr-1.5 pb-1 pl-0.5 rounded-bl-lg border-l border-b border-base-200 flex flex-col'>
        <p className='text-[0.4rem] mx-auto leading-3'>Items Sold:</p>
        <p className='text-[1.4rem] font-extrabold mx-auto leading-4'>{company.soldItems}</p>
      </span>
    </div>
  );
}
