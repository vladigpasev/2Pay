import './globals.css';
import type { Metadata } from 'next';
//import { Inter } from 'next/font/google';
//import { Paytone_One } from 'next/font/google';
import { Rowdies } from 'next/font/google';
import { Wrapper } from '@/components/Wrapper';
import ReactQueryProvider from '@/trpc/Provider';
import { cookies } from 'next/headers';
import { ClientCookiesProvider } from '@/components/CookiesProvider';

const paytoneOne = Rowdies({ subsets: ['latin'], weight: '300' });

export const metadata: Metadata = {
  title: '2Pay - Payment Solutions',
  description: 'Payment solutions for you and your bussiness.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={paytoneOne.className}>
        <ReactQueryProvider>
          <ClientCookiesProvider value={cookies().getAll()}>
            <Wrapper cookies={new Map(cookies())}>{children}</Wrapper>
          </ClientCookiesProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
