export default function AlignmentGoodEvil({ setMyAlignment, myAlignment }) {
    function handleAlignmentChange(secondPart) {
        const alignmentParts = myAlignment.split(' ')
        if(alignmentParts[1]) {
            alignmentParts[1] = secondPart
            const alignment = alignmentParts.join(' ')
            setMyAlignment(alignment)
        } else {
            setMyAlignment(myAlignment => myAlignment + ' ' + secondPart)
        }
    }
    return (
        <div >
            <h3 className="bg-slate-600 text-white p-3 mb-16">Which quest seems the most worthy of your time?</h3>
            <div className="grid grid-cols-2 mt-8 text-xl gap-10 mb-20 text-white">
                <div className="text-center">
                    <input
                        type="radio"
                        value="Good"
                        id="Good"
                        checked={myAlignment === "Good" || myAlignment === "Chaotic Good" || myAlignment === "Nuetral Good" || myAlignment === "Lawful Good"}
                        onChange={(e) => handleAlignmentChange(e.target.value)}
                        className="mr-4 w-6 h-6 align-middle accent-radioYellow"
                    />
                    <label
                        htmlFor="Good"
                        className={`cursor-pointer p-2 rounded-md ${myAlignment === "Good" || myAlignment === "Chaotic Good" || myAlignment === "Nuetral Good" || myAlignment === "Lawful Good" ? "border-b-4 border-solid border-ceptor p-2" : ""
                            }`}
                    >
                       Defending helpless villagers <br />against a group of <br />cruel raiders.
                    </label>
                </div>

                <div className="text-center">
                    <input
                        type="radio"
                        value="Neutral"
                        id="Neutral"
                        checked={myAlignment === "Chaotic Neutral" || myAlignment === "Nuetral Nuetral" || myAlignment === "Lawful Neutral"}
                        onChange={(e) => handleAlignmentChange(e.target.value)}
                        className="mr-4 w-6 h-6 align-middle accent-radioYellow"
                    />
                    <label
                        htmlFor="Neutral"
                        className={`cursor-pointer p-2 rounded-md ${myAlignment === "Chaotic" || myAlignment === "Lawful" || myAlignment === "Neutral" || myAlignment === "Chaotic" || myAlignment === "Chaotic Neutral" || myAlignment === "Nuetral Nuetral" || myAlignment === "Lawful Neutral" ? "border-b-4 border-solid border-ceptor p-2" : ""
                            }`}
                    >
                        Slaying a vicious ogre and <br />taking his gold.
                    </label>
                </div>

                <div className="text-center">
                    <input
                        type="radio"
                        value="Evil"
                        id="Evil"
                        checked={myAlignment === "Evil" || myAlignment === "Chaotic Evil" || myAlignment === "Nuetral Evil" || myAlignment === "Lawful Evil"}
                        onChange={(e) => handleAlignmentChange(e.target.value)}
                        className="mr-4 w-6 h-6 align-middle accent-radioYellow"
                    />
                    <label
                        htmlFor="Evil"
                        className={`cursor-pointer p-2 rounded-md ${myAlignment === "Evil" || myAlignment === "Chaotic Evil" || myAlignment === "Nuetral Evil" || myAlignment === "Lawful Evil" ? "border-b-4 border-solid border-ceptor p-2" : ""
                            }`}
                    >
                        Recovering a cursed ring that <br />will grant you the power <br /> to enslave others.
                    </label>
                </div>
            </div>
        </div>
    )
}