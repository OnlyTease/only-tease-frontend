'use client';
import React, { useState } from 'react';

import { getModalPayment } from '@/lib/func';
import useFetchUserDetails from '@/hooks/user/useFetchUserDetails';

import { MarketPlaceCard2 } from '@/components/ui/marketPlaceCard';

import ModelBanner from '@/app/(main)/profile/(components)/banner';
import ModelFeed from '@/app/(main)/profile/(components)/feed';
import RightSideBar from '@/app/(main)/profile/(components)/rightSideBar';
import { Props } from '@/app/(main)/profile/[id]/page';
import NotFound from '@/app/not-found';
import { allModelData } from '@/utils/modelData';

const CreatorProfile = ({ params }: Props) => {
  const [modelFees, setModelFees] = useState<number>(0);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const modelData = allModelData.filter((item) => item.slug === params.id)[0];

  const { data } = useFetchUserDetails(
    modelData.id.toString()
  )

  const isUnlocked2 = data?.isUnlocked ?? false


  const fetchModalFees = async () => {
    const data = await getModalPayment(modelData.id);
    setModelFees(parseInt(data));
  };

  React.useEffect(() => {
    fetchModalFees();
  }, []);

  if (!modelData) return <NotFound />;
  return (
    <div className=' text-white   container py-6 mx-auto   grid grid-cols-5'>
      <div className=' p-4 md:p-0 mx-auto flex items-center col-span-5 lg:col-span-3 flex-col justify-center  space-y-4 '>
        <ModelBanner likes={0} {...modelData} />
        <div className='w-full block sm:hidden '>
          <RightSideBar
            image={modelData.icon.src}
            name={modelData.name}
            modelFees={modelFees}
            modelId={modelData.id}
            isUnlocked={data?.isUnlocked || isUnlocked}
            setIsUnlocked={setIsUnlocked}
          />
        </div>

        <ModelFeed
          modelData={{ ...modelData, likes: 0, index: 0 }}
          modelFees={modelFees}
          setIsUnlocked={setIsUnlocked}
          isUnlocked={data?.isUnlocked || isUnlocked}
        />
      </div>
      <div className='px-10 hidden lg:block col-span-2'>
        <RightSideBar
          image={modelData.icon.src}
          name={modelData.name}
          modelFees={modelFees}
          modelId={modelData.id}
          isUnlocked={isUnlocked2 || isUnlocked}
          setIsUnlocked={setIsUnlocked}
        />
        <div className='h-[20px]' />
        <MarketPlaceCard2
          image={modelData.icon.src}
          modelName={modelData.name.split(' ')[0]}
        />
      </div>
    </div>
  );
};

export default CreatorProfile;
