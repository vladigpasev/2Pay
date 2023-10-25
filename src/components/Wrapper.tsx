'use client';

import { useAtom } from 'jotai';
import { Footer } from './Footer';
import { Header, themeAtom } from './Header';
import { Suspense } from 'react';
import PageLoading from '@/app/loading';
import AlertDialog from './Alert';
// import dynamic from "next/dynamic";
import Notifyers from './Notifyers';

// const NotifyersWithNoSSR = dynamic(() => import("./Notifyers"), {
//   ssr: false,
// });
export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const [theme] = useAtom(themeAtom);
  return (
    <div data-theme={theme}>
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
