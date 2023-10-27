'use client';

import Image from 'next/image';
import logo from '../../public/images/branding/2pay-logo-green-short.png'
import landing_hero from '../../public/images/pngs/landing-1.png'

export default function Home() {
  return (
    <>
      <section className="bg-primary">
        <section className="w-full text-secondary flex">
          <section className="flex flex-col items-center mx-0 mt-16">
            <p className="py-8 text-7xl text-center">Effective payments.</p>
            <p className='py-2 text-xl w-1/2 text-center'>Already tired of setting up your e-commerce for hours with the casual platforms? 2Pay makes this happen in no time! Our payment service allows for easier, faster and more secure transactions between users and businesses!</p>
            <section className="btn btn-secondary text-primary">Start now!</section>
          </section>

          <section className="image flex justify-end items-start basis-2/3">
            <Image src={landing_hero} alt='' className='my-12 mx-5'></Image>
          </section>
        </section>

        <section className="features text-center text-2xl">
          <p className="text-3xl text-">Our features:</p>
        </section>
      </section>
    </>
  );
}
