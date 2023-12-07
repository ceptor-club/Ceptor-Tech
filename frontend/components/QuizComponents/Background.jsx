import { CONSTANTS } from "../../utils/CONSTANTS"

export default function Background({ background, setBackground }) {
    const characterBackgrounds = CONSTANTS.characterBackground
    return (
        <div>
            <div className="bg-slate-600 text-white p-3 mb-6">
                <h3 id='species-header'>Which background sounds most interesting to you?</h3>
            </div>
            <div className="grid grid-cols-3 mt-8 text-xl gap-10 mb-32 text-white">
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
                                    className="mr-4 w-6 h-6 align-middle accent-radioYellow"
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