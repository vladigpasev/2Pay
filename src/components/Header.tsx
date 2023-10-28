import { atom } from 'jotai';
import Link from 'next/link';
import { useHydrateAtoms } from 'jotai/utils';
import ThemeToggler from './ThemeToggler';
import { useLogout } from '@/auth/logout';
import { useUser } from '@/hooks/useUser';

export const lightTheme = 'paymentLight';
export const darkTheme = 'paymentDark';

export let themeAtom = atom<undefined | typeof lightTheme | typeof darkTheme>(undefined);

const LightDarkThemeSwitch = ({ cookies }: { cookies: Map<string, any> }) => {
  return <ThemeToggler />;
};

export const Header = ({ cookies }: { cookies: Map<string, any> }) => {
  const user = useUser();

  return (
    <div className='navbar text-neutral-content top-0 sticky bg-[hsl(var(--nf)/0.65)] shadow-md shadow-[hsl(var(--b2)/0.25)] backdrop-blur-md z-50'>
      <div className='navbar-start'>
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
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className='p-2'>
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <Link href='/' className='btn btn-ghost normal-case text-xl text-secondary max-sm:-ml-5'>
          <img className='h-7 sm:h-9' src='/images/branding/icon.png' alt='DoNuts' />
          Do<strong className='text-primary p-0 -ml-1.5'>Nuts</strong>
        </Link>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <a>Item 1</a>
          </li>
          <li tabIndex={0}>
            <details>
              <summary>Parent</summary>
              <ul className='p-2 text-base-content'>
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
      <div className='navbar-end flex align-middle gap-1'>
        <LightDarkThemeSwitch cookies={cookies} />
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
            <Link href='/auth/signin' className='btn btn-ghost ml-1 max-sm:ml-0 max-sm:p-1'>
              Sign In
            </Link>
            <Link href='/auth/signup' className='btn btn-secondary max-sm:p-2'>
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
function useServerUser() {
  throw new Error('Function not implemented.');
}
