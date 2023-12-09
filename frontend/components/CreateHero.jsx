import React from 'react';
import Image from 'next/image';
<<<<<<< HEAD
import Navbar from './NavBar/NavbarMdUp';
import Logo2 from '../public/images/CREATE-hero/Logo2.jpeg';
import VectorImage from './VectorImage';
import StartButton from './Buttons/StartButton';
=======
import Navbar from './NavbarMdUp';
import Logo2 from '../public/images/CREATE-hero/Logo2.jpeg';
import HamburgerMenu from './HamburgerMenu';
import VectorImage from './VectorImage';
import StartButton from './StartButton';
>>>>>>> tech-dev
import landingpage from '../public/images/CREATE-hero/LandingPage.jpeg';

export default function CreateHero({ setConditionalRender }) {
  return (
    <div className='flex flex-col justify-center items-center max-h-screen w-full'>
      <Image
        src={landingpage}
        alt='LandingPage'
        className='object-fit: cover h-screen'
        priority
      />
      <div className='absolute my-auto  h-72 w-96'>
        <VectorImage />
      </div>
      <div className='bottom-0 absolute   h-32 w-32'>
        <StartButton setConditionalRender={setConditionalRender} />
      </div>
    </div>
  );
}
