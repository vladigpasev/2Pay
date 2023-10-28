// 'use client';

import { Footer } from './Footer';
import { Header } from './Header';
import { Suspense } from 'react';
import PageLoading from '@/app/loading';
import AlertDialog from './utils/Modal';
// import dynamic from "next/dynamic";
import Notifyers, { NotificationType, useDispatchNotification } from './utils/Notifyers';
import { darkTheme } from './ThemeToggler';

// const NotifyersWithNoSSR = dynamic(() => import("./Notifyers"), {
//   ssr: false,
// });
export const Wrapper = ({ children, cookies }: { children: React.ReactNode; cookies: any }) => {
  return (
    <div data-theme={cookies.get('theme')?.value ?? darkTheme}>
      <div className='w-full'>
        <Header />
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

