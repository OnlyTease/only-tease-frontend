import Image from 'next/image';
import React from 'react';
import Wave from '../../../public/landingPage/waves.webp';
import creator1 from '../../../public/landingPage/creators-1.webp';
import creator2 from '../../../public/landingPage/creatos-2.webp';
import Subscribe from '../../../public/landingPage/subscribe.png';

const JoinCommunities = () => {
  return (
    <div className='relative h-screen flex items-center justify-center'>
      <Image src={Wave} alt='wave' className='absolute h-full w-full' />

      <div className='container mx-auto relative bg-white p-10 rounded-lg shadow-lg z-10 w-11/12 max-w-screen-lg'>
        <div className='grid grid-cols-2 gap-x-12'>
          <div className='flex flex-col items-start justify-between gap-y-4'>
            <div>
              <div className='text-black text-2xl landing-font'>
                Subscribe to access
              </div>
              <p>
                OnlyTease makes it simple for fans and creators to manage their
                funds with our Crypto OnRamp and OffRamp features.
              </p>
            </div>
            <div className='w-full flex items-center gap-x-6'>
              <input
                className='my-10 w-full p-2 border border-gray-300 rounded-md'
                placeholder='Enter your email'
                type='email'
              />
              <button className='border-2 border-red-200 p-2 rounded-md'>
                Subscribe
              </button>
            </div>
            <Image src={Subscribe} alt='subscribe' className='mx-auto' />
          </div>
          <div>
            <div className='relative overflow-hidden h-32 mb-5'>
              <Image
                src={creator1}
                alt='creators'
                className='absolute opacity-70 h-32 w-full rounded-lg animate-leftToRight'
              />
            </div>
            <div className='relative overflow-hidden h-32'>
              <Image
                src={creator2}
                alt='creators-2'
                className='absolute opacity-70 h-32 w-full rounded-lg animate-rightToLeft'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinCommunities;
