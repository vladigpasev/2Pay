'use client';

import Image from 'next/image';
import logo from '../../public/images/branding/2pay-logo-green-short.png'
import landing_hero from '../../public/images/pngs/landing-1.png'
import feature1 from '../../public/images/svg/integration-svgrepo-com.svg'
import feature2 from '../../public/images/svg/powerful-svgrepo-com.svg';
import feature3 from '../../public/images/svg/secure-wallet-svgrepo-com.svg'
import card from '../../public/images/pngs/card.png'

export default function Home() {
  return (
    <>
      <section className="">
        <section className="w-full flex max-[768px]:flex-col mb-12">
          <section className="flex flex-col items-center mx-0 mt-28 text-primary">
            <p className="py-8 pb-10 mx-5 md:mx-0 text-7xl text-center">Effective payments.</p>
            <p className='py-2 text-xl mx-5 md:mx-0 md:w-1/2 text-center font-light'>Already tired of setting up your e-commerce for hours with the casual platforms? 2Pay makes this happen in no time! Our payment service allows for easier, faster and more secure transactions between users and businesses!</p>
            <section className="btn btn-primary">Start now!</section>
          </section>

          <section className="image  flex md:justify-end items-start md:basis-2/3">
            <Image src={landing_hero} alt='' className='md:my-12 md:mx-48 my-2 mx-5'></Image>
          </section>
        </section>

        <section className="features text-center text-2xl mb-32 text-primary">
          <p className="text-3xl">Our features:</p>

          <section className="features-items flex max-[768px]:flex-col gap-28 justify-center text-center 
          my-8 ">
            <section className='text-center flex flex-col justify-center items-center text-primary'>
              <Image src={feature1} alt='' className='w-32 text-primary'></Image>
              <p className='text-4xl'>Integration</p>
              <p className='text-xl w-80 pt-5 font-light'>Our payment system is integrated in more than n-thousand websites, and also in applications such as Netflix, Udemy and many more!</p>
            </section>
            <section className='text-center flex flex-col justify-center items-center text-primary'>
              <Image src={feature2} alt='' className='w-32 text-primary'></Image>
              <p className='text-4xl'>Productivity</p>
              <p className='text-xl w-80 pt-5 font-light'>All payments are way faster with 2Pay! This makes your e-commerce way more effective and productive for your business!</p>
            </section>
            <section className='text-center flex flex-col justify-center items-center text-primary'>
              <Image src={feature3} alt='' className='w-32 text-primary'></Image>
              <p className='text-4xl'>Secure</p>
              <p className='text-xl w-80 pt-5 font-light'>In terms of security, our application offers the more secure possible methods, so no one can get your personal data. This make all your payments through this platform secure.</p>
            </section>
          </section>
        </section>
        <section className="get-started mt-10">
          <p className="text-4xl text-center text-primary">Are you ready to get started?</p>
          <section className="flex flex-row max-[768px]:flex-col justify-center items-center">
            <Image src={card} alt=''></Image>
            <section className="right flex max-[768px]:mx-8 md:w-1/3 flex-col justify-center items-center">
              <p className='text-primary font-light md:w-4/5 text-xl pb-7 text-center'>The whole application process is absolutely painless and easy! All you need to do is to just click the button and fill the form!</p>
              <section className='btn btn-primary mb-8'>Start now!</section>
            </section>
          </section>
        </section>
      </section>
    </>
  );
}
