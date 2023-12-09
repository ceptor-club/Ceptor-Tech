// import Head from "next/head";
import { useState, useEffect, createContext, useContext } from 'react';
import { Logo } from '../components/Logo';
<<<<<<< HEAD
import VectorImage from '../components/VectorImage';
import Meta from '../components/Meta';
import Image from 'next/image';
import NavbarMdUp from '../components/NavBar/NavbarMdUp';
import NavbarSmUp from '../components/NavBar/NavbarSmUp';
import Quiz from '../components/Quiz';
import Unruly from '../components/Unruly/Unruly';
import { CharacterContext } from '../components/CharacterModule/CharacterContext';
=======
import HamburgerMenu from '../components/HamburgerMenu';
import VectorImage from '../components/VectorImage';
import Meta from '../components/Meta';
import Image from 'next/image';
import NavbarMdUp from '../components/NavbarMdUp';
import NavbarSmUp from '../components/NavbarSmUp';
import Quiz from '../components/Quiz';
import Unruly from '../components/Unruly/Unruly';
import { CharacterContext } from '../components/CharacterContext';
>>>>>>> tech-dev



export default function QuizPage() {

    const [conditionalRender, setConditionalRender] = useState('');
    const { character, setCharacter } = useContext(CharacterContext)



    return (
        <>
            <Meta />
            <NavbarMdUp />
            <NavbarSmUp />
            {/* <div className='fixed top-0 h-screen w-screen'>
                <Image
                    src='/images/CREATE-midpage/midPageImage.png'
                    width={1000}
                    height={1000}
                    alt='midPage'
                    className='object-cover w-full h-full -z-10'
                />
            </div> */}
            <div className='flex flex-col justify-center items-center'>
                <p className='z-10'>Version 0.8.01*</p>
                <p className='z-10'>
                    *Now with Quiz - A Character quiz to help generate a character!
                </p>

                <Logo setConditionalRender={setConditionalRender} />

                <div className='z-10 flex w-full justify-center'>
                    {/* <div className="w-1/6 h-screen bg-slate-300">
            <p className="">SIDEBAR</p>
          </div> */}

                    <div className=''>
                        <Unruly />
                    </div>
                </div>
            </div>
        </>
    );
}
