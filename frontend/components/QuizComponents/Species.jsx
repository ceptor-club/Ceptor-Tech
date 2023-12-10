import { CONSTANTS } from "../../utils/CONSTANTS"

export default function Species({ humanoidOrNo, species, setSpecies }) {
    const humanoidRaces = CONSTANTS.humanoidCharacterRaces
    const exoticRaces = CONSTANTS.exoticCharacterRaces
    return (
        <div>
            <div className='flex flex-col mt-12 text-xl space-y-8 > * + *' >
                {
                    humanoidOrNo
                        ?
                        <>
                            <h3 id='species-header' className="text-white p-3">Which humanoid sounds coolest to you?</h3>
                            <div className='grid grid-cols-3 text-xl gap-6 mb-32 text-white' >
                                {humanoidRaces.map((race, raceIndex) => {
                                    return (
                                        <div key={raceIndex}>
                                            <div>
                                                <input
                                                    type="radio"
                                                    value={race}
                                                    id={raceIndex}
                                                    checked={species === race}
                                                    onChange={(e) => setSpecies(e.target.value)}
                                                    className="mr-4 w-6 h-6 align-middle accent-customYellow"
                                                />
                                                <label
                                                    htmlFor={raceIndex}
                                                    className={`cursor-pointer p-2 rounded-md ${species === race ? "border-4 border-solid border-customYellow p-2" : ""
                                                        }`}
                                                >
                                                    {race}
                                                </label>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                        :
                        <>
                            <h3 className="text-3xl text-white p-3">Which strange creature sounds coolest to you?</h3>
                            <div className='grid grid-cols-3 text-xl gap-6 mb-32 text-white' >
                                {exoticRaces.map((race, raceIndex) => {
                                    return (
                                        <div key={raceIndex}>
                                            <div>
                                                <input
                                                    type="radio"
                                                    value={race}
                                                    id={raceIndex}
                                                    checked={species === race}
                                                    onChange={(e) => setSpecies(e.target.value)}
                                                    className="mr-4 w-6 h-6 align-middle accent-customYellow"
                                                />
                                                <label
                                                    htmlFor={raceIndex}
                                                    className={`cursor-pointer p-2 rounded-md ${species === race ? "border-4 border-solid border-customYellow p-2" : ""
                                                        }`}
                                                >
                                                    {race}
                                                </label>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                }
            </div>
        </div>
    )
}