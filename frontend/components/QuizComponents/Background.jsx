import { CONSTANTS } from "../../utils/CONSTANTS"

export default function Background({ background, setBackground }) {
    const characterBackgrounds = CONSTANTS.characterBackground
    return (
        <div >
            <h3 className="text-3xl">Which background sounds most interesting to you?</h3>
            <div className='flex flex-col mt-12 text-xl space-y-8 > * + *' >

                {characterBackgrounds.map((characterBackground, backgroundIndex) => {
                    return (
                        <div key={backgroundIndex}>
                            <div>
                                <input
                                    type="radio"
                                    value={characterBackground}
                                    id={backgroundIndex}
                                    checked={background === characterBackground}
                                    onChange={(e) => setBackground(e.target.value)}
                                    className="hidden"
                                />
                                <label
                                    htmlFor={backgroundIndex}
                                    className={`cursor-pointer p-2 rounded-md ${background === characterBackground ? "border-4 border-solid border-ceptor p-2" : ""
                                        }`}
                                >
                                    {characterBackground}
                                </label>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}