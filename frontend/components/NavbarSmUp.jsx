import Image from 'next/image';
import { Logo } from './Logo';
import React, { useState, useRef } from 'react';
import Link from 'next/link';

export default function NavbarSmUp() {
  const [navMenuVisible, setNavMenuVisible] = useState(true);
  // Define the toggleNavMenu function
  const toggleNavMenu = () => {
    setNavMenuVisible(!navMenuVisible);
  };

  return (
    <>
      {/* Small screens */}
      <div className='md:hidden border'>
        <nav
          className={`${
            navMenuVisible ? `h-32` : 'h-8'
          } w-full fixed z-20 bottom-0 left-0 bg-black bg-opacity-90`}
        >
          <div
            className='bg-white w-8 h-8 rounded-full absolute left-4 -top-4'
            onClick={toggleNavMenu}
          ></div>

          {navMenuVisible ? (
            <>
              <div className='w-full h-24 flex flex-col ml-6 mt-6'>
                {/* TODO: Check all hrefs */}
                <Link href='/QuizPage'>QUIZ</Link>
                <Link href='/'>CREATE </Link>
                <Link href='/nftpage'>EXPLORE </Link>
                <Link href='/profile'>PROFILE </Link>
              </div>
            </>
          ) : null}
        </nav>
      </div>
    </>
  );
}
