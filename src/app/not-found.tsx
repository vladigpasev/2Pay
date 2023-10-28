'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import notFound from '../../public/images/notFound.png'
import Link from 'next/link';

export default function Custom404() {
  const router = useRouter();
  return (
    <>
      <section className="not-found">
        <Image src={notFound} alt='' className='m-auto'></Image>
        <p className="text-5xl text-center">The page or the resource you are searching for can not be found!</p>
        <p className="text-2xl text-center">Please, leave this page and <Link className='text-primary' href="/someLinkHere">return here</Link>.</p>
      </section>
    </>
  );
}
