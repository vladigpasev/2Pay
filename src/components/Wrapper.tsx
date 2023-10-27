'use client';

import { useAtom } from 'jotai';
import { Footer } from './Footer';
import { Header, darkTheme, themeAtom } from './Header';
import { Suspense, useEffect } from 'react';
import PageLoading from '@/app/loading';
import AlertDialog from './utils/Modal';
// import dynamic from "next/dynamic";
import Notifyers, { NotificationType, useDispatchNotification } from './utils/Notifyers';
import { useLoadTokens } from '@/auth/token';

// const NotifyersWithNoSSR = dynamic(() => import("./Notifyers"), {
//   ssr: false,
// });
export const Wrapper = ({ children, cookies }: { children: React.ReactNode; cookies: any }) => {
  const [theme] = useAtom(themeAtom);

  useLoadTokens();

  return (
    <div data-theme='garden' /* {theme || (cookies.get('theme')?.value ?? darkTheme)} */>
      <div className='w-full'>
        <Header cookies={cookies} />
        <div className='relative h-fit min-h-[calc(100vh-65px)]'>
          <Suspense fallback={<PageLoading />}>{children}</Suspense>
        </div>
        <Footer />
      </div>
      {/* <NotifyersWithNoSSR /> */}
      <Notifyers />
      <AlertDialog />
    </div>
  );
};

