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
                            <div className="bg-slate-600 text-white p-3 mb-6">
                                <h3 id='species-header'>Which humanoid sounds coolest to you?</h3>
                            </div>
                            <div className="grid grid-cols-2 mt-8 text-xl gap-10 mb-32 text-white" >
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
                                                    className="mr-4 w-6 h-6 align-middle accent-radioYellow"
                                                />
                                                <label
                                                    htmlFor={raceIndex}
                                                    className={`cursor-pointer p-2 rounded-md ${species === race ? "border-4 border-solid border-ceptor p-2" : ""
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
                            <h3 className="text-3xl">Which strange creature sounds coolest to you?</h3>
                            <div className='flex flex-col mt-12 text-xl space-y-8 > * + *' >
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
                                                    className="mr-4 w-6 h-6 align-middle accent-radioYellow"
                                                />
                                                <label
                                                    htmlFor={raceIndex}
                                                    className={`cursor-pointer p-2 rounded-md ${species === race ? "border-4 border-solid border-ceptor p-2" : ""
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