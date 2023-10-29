'use client';

import { atom } from 'jotai';
import Link from 'next/link';
import { useHydrateAtoms } from 'jotai/utils';
import ThemeToggler from './ThemeToggler';
import { useLogout } from '@/auth/logout';
import { useUser } from '@/hooks/useUser';
import logo from '../../public/images/branding/2pay-logo-green-short.png';
import Image from 'next/image';

import { useLoadTokens } from '@/auth/token';

export const Header = () => {
  useLoadTokens();

  const user = useUser();

  //[hsl(var(--nf)/0.65)] -for bg color
  return (
    <div className='navbar top-0 sticky bg-secondary shadow-md shadow-[hsl(var(--b2)/0.25)] backdrop-blur-md z-50 text-neutral-content'>
      <div className='navbar-start max-[400px]:-ml-2'>
        <div className='dropdown'>
          <label tabIndex={0} className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-base-content'
          >
            <li>
              <a>For Businesses</a>
              <ul className='p-2'>
                <li>
                  <a>Contacts</a>
                </li>
                <li>
                  <a>Items</a>
                </li>
                <li>
                  <a>Sales</a>
                </li>
              </ul>
            </li>
            <li>
              <a>For Clients</a>
              <ul className='p-2'>
                <li>
                  <a>Contacts</a>
                </li>
                <li>
                  <a>Purchases</a>
                </li>
                <li>
                  <a>Payment</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <Link href='/' className=''>
          <Image src={logo} alt='' className='w-3/5 min-[500px]:w-2/5'></Image>
        </Link>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal max-[400px]:px-1'>
          <li tabIndex={0}>
            <details>
              <summary>For Business</summary>
              <ul className='p-2 text-base-content'>
                <li>
                  <a>Contacts</a>
                </li>
                <li>
                  <a>Items</a>
                </li>
                <li>
                  <a>Sales</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>For Clients</summary>
              <ul className='p-2 text-base-content'>
                <li>
                  <a>Contacts</a>
                </li>
                <li>
                  <a>Purchases</a>
                </li>
                <li>
                  <a>Payment</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className='navbar-end flex align-middle gap-1 ml-2'>
        <Link className='mr-2' href='/search'>
          <svg
            style={{ width: '32px', height: '32px' }}
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
        <ThemeToggler />
        {user ? (
          <Link href='/user/profile'>
            <img
              src={user.profilePictureURL}
              alt='user profile'
              width={42}
              height={42}
              className='ml-2 rounded aspect-square'
            />
          </Link>
        ) : (
          <>
            <Link href='/auth/signin' className='btn btn-ghost ml-1 max-sm:ml-0 max-sm:p-1 text-sm'>
              Sign In
            </Link>
            <Link href='/auth/signup' className='btn btn-primary max-sm:p-2 text-xs'>
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
