'use client';

import { atom } from 'jotai';
import Link from 'next/link';
import { useHydrateAtoms } from 'jotai/utils';
import ThemeToggler from './ThemeToggler';
import { useLogout } from '@/auth/logout';
import { useUser } from '@/hooks/useUser';
import logo from '../../public/images/branding/2pay-logo-green-short.png'
import burger from '../../public/images/svg/menu-hamburger.svg'
import Image from 'next/image';
import { useState } from 'react';

import { useLoadTokens } from '@/auth/token';

export const Header = () => {
  useLoadTokens();

  const user = useUser();

  /*
  const [isToggled, setToggled] = useState(false);

  const toggleHamburger = () => {
    setToggled(!isToggled);
  }; 
  */

  return (
    <div className='navbar top-0 sticky bg-secondary shadow-md shadow-[hsl(var(--b2)/0.25)] z-50 text-neutral-content'>
      <div className='navbar-start max-[400px]:-ml-2'>
        <div className='dropdown backdrop-blur-sm'>
          <label tabIndex={0} className='btn btn-ghost lg:hidden '>
            <Image src={burger} alt='' className='w-12'></Image>
          </label>
          <ul
            tabIndex={0}
            className='menu menu-sm flex flex-col backdrop-blur-sm dropdown-content mr-32 mt-3 z-[1] p-2 shadow shadow-black bg-base-100 rounded-box text-base-content'
          >
            <li className='flex flex-col w-[768px] '>
              <Link href="/">For Businesses</Link>
              <ul className='p-2'>
                <li>
                  <Link href="/">Contacts</Link>
                </li>
                <li>
                  <Link href="/">Items</Link>
                </li>
                <li>
                  <Link href="/">Sales</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/">For Clients</Link>
              <ul className=''>
                <li>
                  <Link href="/">Contacts</Link>
                </li>
                <li>
                  <Link href="/">Purchases</Link>
                </li>
                <li>
                  <Link href="/">Payment</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/">Explore</Link>
            </li>
          </ul>
        </div>
        <Link href="/" className=''><Image src={logo} alt='' className='w-3/5 min-[500px]:w-2/5'></Image></Link>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal max-[400px]:px-1'>
          <li tabIndex={0}>
            <details>
              <summary>For Business</summary>
              <ul className='p-2 text-base-content'>
                <li>
                  <Link href="/">Contacts</Link>
                </li>
                <li>
                  <Link href="/">Items</Link>
                </li>
                <li>
                  <Link href="/">Sales</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>For Clients</summary>
              <ul className='p-2 text-base-content'>
                <li>
                  <Link href="/">Contacts</Link>
                </li>
                <li>
                  <Link href="/">Purchases</Link>
                </li>
                <li>
                  <Link href="/">Payment</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className='navbar-end flex align-middle gap-1 ml-2'>
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

