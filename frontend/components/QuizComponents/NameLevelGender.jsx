import React from "react"
import { RandomName } from "../RandomName"
import Image from 'next/image';
import pagination from '../../public/images/pagination.png'
export default function NameLevelGender({ charName, setCharName, level, setLevel, gender, setGender }) {



    return (
        <>
            
            <div className="character-bg">
                <h3 className="mt-12 leading-8 text-2xl mb-12 text-white">What do you want to name your character?</h3>
            </div>
            <div className="custom-container">
                    <div className="custom-child-parent">
                    <div className='custom-child-box1 gap-5' id='pName-div'>
                        <div className="flex w-4/5 relative">
                            <label className="text-xl dFont text-white mr-5 mt-3">Character Name: </label>
                            <input className="grow border iBorder p-2.5 placeholder-black text-black" type="text" placeholder="Enter your character's name" value={charName} id="pName" onChange={(e) => setCharName(e.target.value)} />
                            <input type="button" className='cursor-pointer m-2 absolute right-0 top-0 bottom-0 px-4 border-4 border-customOrange bg-customYellow text-black leading-7 text-center place-items-center text-lg' id='random-name-button' onClick={(e) => setCharName(RandomName(e.target.value))} value="Random Name" />
                            {/* <input type="button" className='cursor-pointer border-0 text-black p-4 text-center no-underline inline-block text-base m-4' id='random-name-button' onClick={(e) => setCharName(RandomName(e.target.value))} value="Random Name" /> */}
                        </div>
                    </div>
                    <div className="custom-child-box2 flex flex-col">
                        <div className="m-4 inline-flex">
                            <label className="mx-2 text-xl dFont text-white mr-5">Character Gender: </label>
                            <div className="flex flex-row gap-6">
                                <div>
                                    <input type="radio" value="He" id="He"
                                        checked={gender === "He"} onChange={(e) => setGender(e.target.value)}
                                        className="mr-4 w-6 h-6 align-middle accent-radioYellow"/>
                                    <label htmlFor="He" className={`cursor-pointer p-2 rounded-md border-customYellow ${gender === "He" ? "border-4 border-solid text-white p-2" : "text-white" }`} >
                                        He / Him
                                    </label>
                                </div>

                                <div>
                                    <input type="radio" value="She" id="She"
                                        checked={gender === "She"} onChange={(e) => setGender(e.target.value)}
                                        className="mr-4 w-6 h-6 align-middle accent-radioYellow" />
                                    <label htmlFor="She" className={`cursor-pointer p-2 rounded-md border-customYellow ${gender === "She" ? "border-4 border-solid text-white p-2" : "text-white" }`} >
                                        She / Her
                                    </label>
                                </div>

                                <div>
                                    <input type="radio" value="They" id="They" checked={gender === "They"}
                                        onChange={(e) => setGender(e.target.value)} className="mr-4 w-6 h-6 align-middle accent-radioYellow"/>
                                    <label htmlFor="They" className={`cursor-pointer p-2 rounded-md border-customYellow ${gender === "They" ? "border-4 border-solid text-white p-2" : "text-white"}`}>
                                        They / Them
                                    </label>
                                </div>

                            </div>
                        </div>
                        <div className='m-4' id='pLevel-div'>
                            <label className="text-xl dFont text-white mr-5 align-middle">Level:</label>
                            <input className="text-base text-black py-3 px-4 w-32 h-10 border-4 border-customOrange" type="number" value={level} min={1} max={20} onChange={(e) => setLevel(e.target.value)} />
                        </div>
                    </div>
                    </div>
            </div>
        </>
        
    )
}
