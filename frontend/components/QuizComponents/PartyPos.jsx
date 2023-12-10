export default function PartyPos({ partyPos, setPartyPos }) {
    return (
        <div>
            <div className="text-white p-3 mb-8">
                <h3 className="text-3xl">You and your party ambush a group of monsters. <br /> Where do you see yourself in this fight?</h3>
            </div>
            <div className='flex flex-col text-xl justify-between gap-6 mb-20 text-white' >
                <div>
                    <input
                        type="radio"
                        value="front"
                        id="partyRole1Front"
                        checked={partyPos === "front"}
                        onChange={(e) => setPartyPos(e.target.value)}
                        className="mr-4 w-6 h-6 align-middle accent-customYellow"
                    />
                    <label
                        htmlFor="partyRole1Front"
                        className={`cursor-pointer p-2 rounded-md ${partyPos === "front" ? "border-4 border-solid border-customYellow p-2" : ""
                            }`}
                    >
                        In the front leading the charge
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        value="middle"
                        id="partyRole1Middle"
                        checked={partyPos === "middle"}
                        onChange={(e) => setPartyPos(e.target.value)}
                        className="mr-4 w-6 h-6 align-middle accent-customYellow"
                    />
                    <label
                        htmlFor="partyRole1Middle"
                        className={`cursor-pointer p-2 rounded-md ${partyPos === "middle" ? "border-4 border-solid border-customYellow p-2" : ""
                            }`}
                    >
                        In the middle launching ranged attacks
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        value="back"
                        id="partyRole1Back"
                        checked={partyPos === "back"}
                        onChange={(e) => setPartyPos(e.target.value)}
                        className="mr-4 w-6 h-6 align-middle accent-customYellow"
                    />
                    <label
                        htmlFor="partyRole1Back"
                        className={`cursor-pointer p-2 rounded-md ${partyPos === "back" ? "border-4 border-solid border-customYellow p-2" : ""
                            }`}
                    >
                        In the back supporting your team
                    </label>
                </div>
            </div>
        </div>
    )
}