import React from "react"
<<<<<<< HEAD
import { RandomName } from "../CharacterModule/RandomName"
=======
import { RandomName } from "../RandomName"
>>>>>>> tech-dev

export default function NameLevelGender({ charName, setCharName, level, setLevel, gender, setGender }) {



    return (
        <div >
            <h3 className="leading-8 text-2xl">What do you want to name your character?</h3>
            <div className='flex flex-wrap m-8 flex-col' id='pName-div'>
                <label className="text-xl">Character Name: </label>
                <input className="text-base p-8 m-4 placeholder-black text-black" type="text" placeholder="Character Name" value={charName} id="pName" onChange={(e) => setCharName(e.target.value)} />
                <input type="button" className=' cursor-pointer bg-ceptor border-0 text-black p-4 text-center no-underline inline-block text-base m-4' id='random-name-button' onClick={(e) => setCharName(RandomName(e.target.value))} value="Random Name" />
            </div>
            <div className="flex flex-row">
                <div className='flex flex-wrap m-8 flex-col' id='pLevel-div'>
                    <label className="text-xl" >Starting Level:</label>
                    <input className="text-base text-black p-8 m-4" type="number" value={level} min={1} max={20} onChange={(e) => setLevel(e.target.value)} />
                </div>

                <div className="container max-w-s m-8 inline-flex">
                    <label className="mx-2">Character Gender: </label>
                    <div className="flex flex-col space-y-8 > * + *">

                        <div>
                            <input
                                type="radio"
                                value="He"
                                id="He"
                                checked={gender === "He"}
                                onChange={(e) => setGender(e.target.value)}
                                className="hidden"
                            />
                            <label
                                htmlFor="He"
                                className={`cursor-pointer p-2 rounded-md ${gender === "He" ? "border-4 border-solid border-ceptor p-2" : ""
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
                                className="hidden"
                            />
                            <label
                                htmlFor="She"
                                className={`cursor-pointer p-2 rounded-md ${gender === "She" ? "border-4 border-solid border-ceptor p-2" : ""
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
                                className="hidden"
                            />
                            <label
                                htmlFor="They"
                                className={`cursor-pointer p-2 rounded-md ${gender === "They" ? "border-4 border-solid border-ceptor p-2" : ""
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
