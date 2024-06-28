'use client';

import { AlignJustify } from 'lucide-react';
import { useSession } from "next-auth/react";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import useFetchUserDetails from "@/hooks/user/useFetchUserDetails";
import useWindowSize from '@/hooks/useWindowSize';

import IconButton from "@/components/buttons/IconButton";
import AccountConnect from "@/components/layout/header/AccountConnect";
import GoogleSignIn from "@/components/layout/header/GoogleSiginModal";
import Avatar from "@/components/ui/avatar";

import logo from '../../../public/images/logoWithoutGradient.webp';
import smartWallet from '../../../public/images/Subtract.png';

type props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ isOpen, setIsOpen }: props) => {
  const windowSize = useWindowSize()
  const { data: session, status } = useSession()

  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const { address } = useAccount()

  const { data: userData, isLoading } = useFetchUserDetails()

  useEffect(() => {
    if (address) {
      if (status === "unauthenticated" || userData?.isFound === false) {
        setIsSignInOpen(true)
      }
    }
  }, [address, status, userData?.isFound]);

  return (
    <div className='w-full flex items-center border-[1px] border-t-0 border-r-0 h-[110px] border-l-0 border-[#FCC0FF] bg-[#F7F2FA] justify-between px-6 py-4 lg:py-4 fixed top-0 z-10'>
      <GoogleSignIn isOpen={isSignInOpen} setIsOpen={setIsSignInOpen} />
      {/* <div className='text-white lg:hidden'> */}
      {/*   {!isOpen ? ( */}
      {/*     <svg */}
      {/*       onClick={() => setIsOpen(true)} */}
      {/*       xmlns='http://www.w3.org/2000/svg' */}
      {/*       fill='none' */}
      {/*       viewBox='0 0 24 24' */}
      {/*       strokeWidth={1.5} */}
      {/*       stroke='currentColor' */}
      {/*       className='size-10 transition-all ease-in-out delay-200' */}
      {/*     > */}
      {/*       <path */}
      {/*         strokeLinecap='round' */}
      {/*         strokeLinejoin='round' */}
      {/*         d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' */}
      {/*       /> */}
      {/*     </svg> */}
      {/*   ) : ( */}
      {/*     <svg */}
      {/*       onClick={() => setIsOpen(false)} */}
      {/*       xmlns='http://www.w3.org/2000/svg' */}
      {/*       fill='none' */}
      {/*       viewBox='0 0 24 24' */}
      {/*       strokeWidth={1.5} */}
      {/*       stroke='currentColor' */}
      {/*       className='size-10 transition-all ease-in-out delay-200' */}
      {/*     > */}
      {/*       <path */}
      {/*         strokeLinecap='round' */}
      {/*         strokeLinejoin='round' */}
      {/*         d='M6 18 18 6M6 6l12 12' */}
      {/*       /> */}
      {/*     </svg> */}
      {/*   )} */}
      {/* </div> */}
      <Link href='/' className='hidden md:block'>
        <div className='flex items-end justify-center bg-red-50 text-center'>
          <Image src={logo} priority alt='logo' width={200} height={100} />
          <div className='text-[#000] font-semibold -mb-2 hidden sm:inline-block'>
            only<span className='text-[#272C8A]'>Fans</span> for{' '}
            <span className='text-[#272C8A]'>Web3</span>
          </div>
        </div>
      </Link>
      <div className='flex items-center justify-end fixed right-0 space-x-2 mx-4'>
        {session &&
          <Avatar
            userName={session?.name}
            openId={userData?.open_ai_id}
            ipfsUrl={userData?.ipfs}
            avatarLoading={isLoading}
          />
        }
        <div className='flex items-center text-white justify-end'>
          <AccountConnect />
        </div>
        <div className='hidden md:block'>
          <div className='flex gap-2 justify-center items-center '>
            <Image src={smartWallet} alt="smart-wallet" className='size-10 object-contain' />
            <div className='font-bold text-[#0051FE]'>
              <p>Smart</p>
              <p>Wallet</p>
            </div>
          </div>
        </div>
        {windowSize.width <= 1090 ? <IconButton icon={AlignJustify} onClick={() => setIsOpen(!isOpen)} /> : <></>}
      </div>
    </div>
  );
};

export default Header;
