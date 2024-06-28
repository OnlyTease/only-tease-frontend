'use client';

import Image from 'next/image';
import { useState } from 'react';

import CustomizedTables from '@/components/ui/marketPlaceTable';
import SwiperCoverflow from '@/components/ui/swiper';
import YourCollection from '@/components/ui/yourCollectionComponent';

import { coinData } from '@/utils/natworkData';

function Page() {
  const [collection, setCollection] = useState('Your Collection');
  return (
    <div className=' border-l border  flex gap-10 flex-col w-full items-start py-6 overflow-x-hidden'>
      <SwiperCoverflow />
      <div className=' flex static    gap-3 ml-12'>
        {coinData.map((coin) => {
          return (
            <button
              className='group/button relative inline-flex h-10 w-10 items-center gap-4 justify-center overflow-hidden rounded-lg bg-transparent font-medium text-[#272C8A] transition-all duration-300 hover:w-24'
              key={coin.name}
            >
              <div className='absolute left-0 w-7 h-7 p-0.5  rounded-full'>
                <Image src={coin.icon} alt={coin.name} />
              </div>
              <p className='inline-flex capitalize whitespace-nowrap text-xs opacity-0 transition-all duration-200 group-hover/button:translate-x-[20%] group-hover/button:opacity-100'>
                {coin.name}
              </p>
            </button>
          );
        })}
      </div>
      <div className='w-full md:max-w-[1100px]  md:ml-12'>
        <div className='flex text-white justify-center gap-4 md:justify-around px-10 pb-6 '>
          <span
            onClick={() => setCollection('Your Collection')}
            className={`${collection === 'Your Collection'
              ? 'text-fuchsia-500'
              : 'text-[#625B71]'
              } cursor-pointer font-bold text-lg md:text-xl`}
          >
            Your Collection
          </span>
          <span
            onClick={() => setCollection('Buy Nft')}
            className={`${collection === 'Buy Nft' ? 'text-fuchsia-500' : 'text-[#625B71]'
              } cursor-pointer font-bold text-lg md:text-xl`}
          >
            Buy Collection
          </span>
        </div>
        {collection === 'Buy Nft' ? <CustomizedTables /> : <YourCollection />}
      </div>
    </div>
  );
}

export default Page;
