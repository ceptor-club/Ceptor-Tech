import { CONSTANTS } from "../../utils/CONSTANTS"

export default function Background({ background, setBackground }) {
    const characterBackgrounds = CONSTANTS.characterBackground
    return (
        <div >
            <h3 className="text-3xl text-white mb-2.5">Which background sounds most interesting to you?</h3>
            <div className="grid grid-cols-3 gap-4 text-xl mb-40 text-white">

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
                                    className="mr-4 w-6 h-6 align-middle accent-customYellow"
                                />
                                <label
                                    htmlFor={backgroundIndex}
                                    className={`cursor-pointer p-2 rounded-md ${background === characterBackground ? "border-4 border-solid border-customYellow p-2" : ""
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