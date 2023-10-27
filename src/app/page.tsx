'use client';

import { useUser } from '@/hooks/useUser';
import Image from 'next/image';

export default function Home() {
  const user = useUser();

  return (
    <>
      <section className='w-fit -translate-x-1/2 relative left-1/2 flex flex-col gap-5 min-h-screen justify-center sm:-mt-10'>
        <main className='hero bg-base-100'>
          <div className='hero-content flex-col lg:flex-row gap-8'>
            <Image
              height={377}
              width={512}
              alt='stock photo'
              src='/images/gifs/donuts1.gif'
              className='max-w-lg w-full rounded-lg shadow-2xl'
            />
            <div className='w-2/4 max-md:w-full'>
              <h1 className='text-6xl max-sm:text-5xl leading-9 text-center font-semibold text-base-content'>
                {JSON.stringify(user)} <strong className='text-accent'>Goal</strong> ⚽
              </h1>
              <p className='py-6 text-base-content'>
                We want <strong>not just</strong> to let you be happy, but make you{' '}
                <strong className='text-accent'>happy</strong>. <i>How</i> are we doing this? We will give you{' '}
                <strong>
                  the best <u className='text-primary'>donuts</u>
                </strong>{' '}
                in town while letting have{' '}
                <u>
                  <strong className='text-secondary'>fun</strong>
                </u>
                . Again here comes the question <i>how</i>? By letting you <strong>chat</strong>
                with friends, play <strong>board games</strong>, be part of our daily
                <strong>games/contests</strong> and just relexing in our{' '}
                <strong className='text-accent'>chillll</strong> zone where you will get a massage by our proffesional
                japanese masseur.
              </p>
            </div>
          </div>
        </main>
        <div className='px-10 mb-5'>
          <div className='stats shadow w-full stats-vertical lg:stats-horizontal border-secondary border'>
            <div className='stat'>
              <div className='stat-figure text-secondary'>
                <img
                  src='/images/pngs/fat-user.png'
                  alt='happy fat users'
                  className='inline-block w-12 h-12 stroke-current'
                />
              </div>
              <div className='stat-title'>Happy Clients</div>
              <div className='stat-value'>12K</div>
              <div className='stat-desc'>In our existence</div>
            </div>

            <div className='stat'>
              <div className='stat-figure text-secondary'>
                <img
                  src='/images/gifs/floatingDonuts.gif'
                  alt='floating donuts'
                  className='inline-block w-16 h-16 stroke-current'
                />
              </div>
              <div className='stat-title'>Donuts Sold</div>
              <div className='stat-value'>513K</div>
              <div className='stat-desc'>In our existence</div>
            </div>

            <div className='stat'>
              <div className='stat-figure text-secondary'>
                <img
                  src='/images/pngs/contest.png'
                  alt='constes organised'
                  className='inline-block w-12 h-12 stroke-current'
                />
              </div>
              <div className='stat-title'>Contests</div>
              <div className='stat-value'>356</div>
              <div className='stat-desc'>With a price</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

