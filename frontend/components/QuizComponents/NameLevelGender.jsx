import React from "react"
import { RandomName } from "../RandomName"

export default function NameLevelGender({ charName, setCharName, level, setLevel, gender, setGender }) {



    return (
        <div >
            <h3 className="leading-8 mt-12 text-2xl mb-12 text-white">What do you want to name your character?</h3>
            <div className='flex w-5/5 relative' id='pName-div'>
                <label className="text-xl dFont text-white mr-5 mt-3">Character Name: </label>
                <input className="grow border iBorder p-2.5 placeholder-black text-black" type="text" placeholder="Character Name" value={charName} id="pName" onChange={(e) => setCharName(e.target.value)} />
                <input type="button" className='cursor-pointer m-2 absolute right-0 top-0 bottom-0 px-4 border-4 border-customOrange bg-customYellow text-black leading-7 text-center place-items-center text-lg' id='random-name-button' onClick={(e) => setCharName(RandomName(e.target.value))} value="Random Name" />
            </div>
            <div className="flex flex-col">
                <div className='m-4' id='pLevel-div'>
                    <label className="text-xl dFont text-white mr-5 align-middle" >Level:</label>
                    <input className="text-base text-black py-3 px-4 w-32 h-10 border-4 border-customOrange" type="number" value={level} min={1} max={20} onChange={(e) => setLevel(e.target.value)} />
                </div>

                <div className="container m-4 inline-flex">
                    <label className="mx-2 text-xl dFont text-white mr-5">Character Gender: </label>
                    <div className="flex flex-row gap-6">

                        <div>
                            <input
                                type="radio"
                                value="He"
                                id="He"
                                checked={gender === "He"}
                                onChange={(e) => setGender(e.target.value)}
                                className="mr-4 w-6 h-6 align-middle accent-customYellow"
                            />
                            <label
                                htmlFor="He"
                                className={`cursor-pointer p-2 rounded-md border-customYellow ${gender === "He" ? "border-4 border-solid border-ceptor p-2 text-white" : "text-white"
                                    }`}
                            >
                                He / Him
                            </label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                value="She"
                                id="She"
                                checked={gender === "She"}
                                onChange={(e) => setGender(e.target.value)}
                                className="mr-4 w-6 h-6 align-middle accent-customYellow"
                            />
                            <label
                                htmlFor="She"
                                className={`cursor-pointer p-2 rounded-md border-customYellow ${gender === "She" ? "border-4 border-solid border-ceptor p-2 text-white" : "text-white"
                                    }`}
                            >
                                She / Her
                            </label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                value="They"
                                id="They"
                                checked={gender === "They"}
                                onChange={(e) => setGender(e.target.value)}
                                className="mr-4 w-6 h-6 align-middle accent-customYellow"
                            />
                            <label
                                htmlFor="They"
                                className={`cursor-pointer p-2 rounded-md border-customYellow ${gender === "They" ? "border-4 border-solid border-ceptor text-white p-2" : "text-white"
                                    }`}
                            >
                                They / Them
                            </label>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
