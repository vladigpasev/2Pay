'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SearchElement({ initial }: { initial: string }) {
  const [search, setSearch] = useState(initial);
  return (
    <div className='form-control'>
      <div className='input-group w-full mx-auto flex max-w-3xl mb-12'>
        <input
          type='search'
          className='input input-lg bg-neutral w-full border-accent border-t border-l border-b border-r-0 flex-grow'
          placeholder='Search: '
          value={search}
          onInput={(e: any) => setSearch(e.target.value)}
        />
        <Link
          className='btn btn-lg btn-square btn-primary border-accent border-t border-l-0 border-b border-r'
          href={`/search/${search}`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
