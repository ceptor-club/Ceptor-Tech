import React from "react"
import { RandomName } from "../RandomName"

export default function NameLevelGender({ charName, setCharName, level, setLevel, gender, setGender }) {



    return (
        <>
            <div className="custom-container">
                <h3 className="mt-12 leading-8 text-2xl mb-12 text-white">What do you want to name your character?</h3>
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
                        <div className="m-4 inline-flex p">
                            <label className="mx-2 text-xl dFont text-white mr-5">Character Gender: </label>
                            <div className="flex flex-row">
                                <div>
                                    <input type="radio" value="He" id="He"
                                        checked={gender === "He"} onChange={(e) => setGender(e.target.value)}
                                        className=""/>
                                    <label htmlFor="He" className={`cursor-pointer p-2 rounded-md ${gender === "He" ? "border-4 border-solid border-ceptor p-2" : "" }`} >
                                        He / Him
                                    </label>
                                </div>

                                <div>
                                    <input type="radio" value="She" id="She"
                                        checked={gender === "She"} onChange={(e) => setGender(e.target.value)}
                                        className="hidden" />
                                    <label htmlFor="She" className={`cursor-pointer p-2 rounded-md ${gender === "She" ? "border-4 border-solid border-ceptor p-2" : "" }`} >
                                        She / Her
                                    </label>
                                </div>

                                <div>
                                    <input type="radio" value="They" id="They" checked={gender === "They"}
                                        onChange={(e) => setGender(e.target.value)} className="hidden"/>
                                    <label htmlFor="They" className={`cursor-pointer p-2 rounded-md ${gender === "They" ? "border-4 border-solid border-ceptor p-2" : ""}`}>
                                        They / Them
                                    </label>
                                </div>

                            </div>
                        </div>
                        <div className='flex m-4 flex-row' id='pLevel-div'>
                            <label className="text-xl dFont text-white mr-5">Starting Level:</label>
                            <input className="text-base text-black p-8 m-4" type="number" value={level} min={1} max={20} onChange={(e) => setLevel(e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    )
}
