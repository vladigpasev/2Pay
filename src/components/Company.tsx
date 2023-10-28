import { Company } from '@/server/service/company';
import { index } from 'drizzle-orm/mysql-core';
import Link from 'next/link';

export default function Compnay({ company }: { company: Company }) {
  return (
    <Link
      href={`/companies/${company.uuid}`}
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
          <p className='text-xs text-gray-500 mt-0.5 line-clamp-3 overflow-hidden'>{company.description}</p>
          <a
            href={`mailto:${company.contactEmail}`}
            className='text-[#00b65eb4] text-xs hover:underline mt-0.5 block truncate overflow-hidden'
          >
            {company.contactEmail}
          </a>
        </div>
      </div>
    </Link>
  );
}
