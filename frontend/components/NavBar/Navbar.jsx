import Image from 'next/image';
import Logo from '../public/images/CREATE-hero/logo.png';
import React, { useState, useRef } from 'react';
import WalletConnectButton from './WalletConnectButton';
import Link from 'next/link';

export default function Navbar() {
  const [navMenuVisible, setNavMenuVisible] = useState(true);
  // Define the toggleNavMenu function
  const toggleNavMenu = () => {
    setNavMenuVisible(!navMenuVisible);
  };

  return (
    <nav
      className={`max-w-none bg-black px-4 sm:px-4 py-2.5 dark:bg-red-900 fixed w-full z-20 top-0 left-0 border-b-block border-black-200 dark:border-black-600`}
    >
      <div>
        <Image
          id='logo'
          src={Logo}
          alt='logo'
          className='flex mx-auto shrink w-12 object-contain'
        />
      </div>

      <div className='flex bg-blue-900 md:order-2'>
        <button
          data-collapse-toggle='navbar-sticky'
          type='button'
          className='ml-auto inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          aria-controls='navbar-sticky'
          aria-expanded='false'
          onClick={toggleNavMenu}
        >
          <svg
            className='w-6 h-6'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
              clipRule='evenodd'
            ></path>
          </svg>
        </button>
      </div>
      <div
        className={`items-center justify-center w-full md:flex bg-blue-400 md:w-auto  md:order-1 ${
          navMenuVisible ? 'block' : 'hidden'
        }`}
        id='navbar-sticky'
      >
        {/*         <ul className="flex flex-col justify-center items-center w-full p-4 mt-4 border border-black-100 rounded-lg bg-black-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-yellow-400 dark:bg-black-800 md:dark:bg-black-900 dark:border-black-700">

          <li>
            <a href="#" class="block py-2 pl-3 pr-4 text-white bg-red-700 rounded md:bg-transparent md:text-white-700 md:p-0 dark:text-white text-xl font-medium hover:text-yellow-500 transition-all" aria-current="page">CREATE</a>
          </li>

          <li>
            <a href="#" className="block py-2 pl-3 pr-4 text-white-700 rounded md:p-0 dark:text-white-400 text-xl font-medium hover:text-yellow-500 transition-all">ABOUT</a>
          </li>
          <li>
            <a href="#" class="block py-2 pl-3 pr-4 text-white-700 rounded md:p-0 dark:text-white-400 text-xl font-medium hover:text-yellow-500 transition-all">EXPLORE</a>
          </li>

          <li>
            <a href="#" className="block py-2 pl-3 pr-4 text-white-700 rounded md:p-0 dark:text-white-400 text-xl font-medium hover:text-yellow-500 transition-all">CONNECT</a>
          </li>

        </ul> */}
      </div>
    </nav>
  );
}
