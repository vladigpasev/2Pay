import Image from 'next/image';
import logo from '../../public/images/branding/2pay-logo-short-trans.png';
import landing_hero from '../../public/images/pngs/landing-1.png';
import feature1 from '../../public/images/svg/integration-svgrepo-com.svg';
import feature2 from '../../public/images/svg/powerful-svgrepo-com.svg';
import feature3 from '../../public/images/svg/secure-wallet-svgrepo-com.svg';
import card from '../../public/images/pngs/card.png';
import MyCompanies from '@/components/MyCompanies';
import bankingImg from '../../public/images/pngs/banking.jpg';
import clientImg from '../../public/images/pngs/2pay-payments.png';
import bitcoin from '../../public/images/pngs/crypto-trans.png';
import TrendingPage from './trending/page';

export default function Home() {
  return (
    <>
      <section className=''>
        <section className='w-full flex max-[768px]:flex-col mb-12'>
          <section className='flex flex-col items-center mx-0 mt-5 min-[400px]:mt-28 text-primary '>
            <p className='py-8 pb-10 mx-5 md:mx-0 text-5xl min-[400px]:text-7xl text-center'>Effective payments.</p>
            <p className='py-2 text-base min-[400px]:text-xl mx-5 md:mx-0 md:w-1/2 text-justify min-[400px]:text-center font-light'>
              Already tired of setting up your e-commerce for hours with the casual platforms? 2Pay makes this happen in
              no time! Our payment service allows for easier, faster and more secure transactions between users and
              businesses!
            </p>
            <section className='btn btn-primary mb-5 mt-2'>Start now!</section>
          </section>

          <section className='image  flex justify-center min-[1650px]:justify-end m-auto min-[1650px]:items-start md:basis-2/3'>
            <Image src={landing_hero} alt='' className='md:my-12 md:mx-48 my-2 mx-5'></Image>
          </section>
        </section>

        <section className='features text-center text-2xl mb-32 py-7 text-neutral bg-gradient-to-r from-[#00a54c] to-[#006b32]'>
          <p className='text-3xl'>Our features:</p>

          <section
            className='features-items flex max-[1280px]:flex-col gap-28 justify-center text-center items-center
          my-8 '
          >
            <section className='text-center flex flex-col justify-center items-center'>
              <Image src={feature1} alt='' className='w-32 canInvert'></Image>
              <p className='text-4xl'>Integration</p>
              <p className='text-lg min-[400px]:text-xl w-80 pt-6 px-5 font-light'>
                Our payment system is integrated in more than n-thousand websites, and also in applications such as
                Netflix, Udemy and many more!
              </p>
            </section>
            <section className='text-center flex flex-col justify-center items-center'>
              <Image src={feature2} alt='' className='w-32 canInvert'></Image>
              <p className='text-4xl'>Productivity</p>
              <p className='text-lg min-[400px]:text-xl w-80 pt-6 px-5 font-light'>
                All payments are way faster with 2Pay! This makes your e-commerce way more effective and productive for
                your business and users!
              </p>
            </section>
            <section className='text-center flex flex-col justify-center items-center'>
              <Image src={feature3} alt='' className='w-32 canInvert'></Image>
              <p className='text-4xl'>Secure</p>
              <p className='text-lg min-[400px]:text-xl w-80 pt-6 px-5 font-light'>
                In terms of security, our application offers the more secure possible methods, so no one can get your
                personal data. This make all your payments through this platform secure.
              </p>
            </section>
          </section>
        </section>
        <section
          id='forBusiness'
          className='for-businesses flex flex-col min-[883px]:flex-row mx-10 min-[883px]:ml-28 items-center justify-center gap-12 mb-28'
        >
          <section className='text'>
            <p className='text-5xl mb-10'>Providing the solution for every business</p>
            <p className='text-xl mb-14'>
              2Pay is the most trusted payment system in the business. The trust is based on our stable platform, secure
              transactions, and easy integration into every website and software possible.
            </p>
            <section className='flex items-center justify-center'>
              <section className='btn btn-primary'>
                Set your business at <Image src={logo} alt='' className='w-20'></Image>
              </section>
            </section>
          </section>
          <Image src={bankingImg} alt='' className='rounded-xl w-96 min-[883px]:w-1/2 min-[883px]:-mr-40'></Image>
        </section>
        <section
          id='fairOurClients'
          className='for-clients flex flex-col min-[883px]:flex-row-reverse mx-10 min-[883px]:ml-28 items-center justify-center gap-12'
        >
          <section className='text'>
            <p className='text-5xl mb-10'>Fair to our clients</p>
            <p className='text-xl mb-14'>
              The reason why milions of people 2Pay as their payment system is our propriety towards them. Our clients
              rely on us for fast eand easy payments, everyday from every point on Planet Earth.
            </p>
            <section className='flex items-center justify-center'>
              <section className='btn btn-primary'>
                Be a client of <Image src={logo} alt='' className='w-20'></Image>
              </section>
            </section>
          </section>
          <Image src={clientImg} alt='' className='rounded-xl  w-96 min-[883px]:w-1/3 '></Image>
        </section>
        <section
          id='crypto2pay'
          className='crypto-pay bg-gradient-to-b from-[#00a54c] to-[#006b32] flex flex-col justify-center items-center mt-10'
        >
          <section className='text-neutral mx-10 md:mx-32'>
            <p className='text-3xl min-[450px]:text-6xl flex items-center justify-center py-8'>
              Crypto <Image src={logo} alt='' className='w-28 min-[450px]:w-44'></Image>
            </p>
            <p className='text-xl md:max-w-[700px] text-center'>
              Our newest and most special feature for those, who want their payments to be fully encrypted! Crypto2Pay
              offers not just payments in crypto. It offers 100% security of the payments, and also full encription, so
              no violators may track your flow of money.
            </p>
          </section>
          <Image src={bitcoin} alt='' className='w-72 md:w-1/4'></Image>
        </section>
        <section className='get-started mt-10'>
          <p className='text-4xl text-center text-primary px-5'>Are you ready to get started?</p>
          <section className='flex flex-row max-[768px]:flex-col justify-center items-center'>
            <Image src={card} alt=''></Image>
            <section className='right flex max-[768px]:mx-8 md:w-1/3 flex-col justify-center items-center'>
              <p className='text-primary font-light md:w-4/5 text-xl pb-7 text-center'>
                The whole application process is absolutely painless and easy! All you need to do is to just click the
                button and fill the form!
              </p>
              <section className='btn btn-primary mb-8'>Start now!</section>
            </section>
          </section>
        </section>
      </section>
      <TrendingPage />
    </>
  );
}
