export default function Question2({ weapon, setWeapon }) {
    return (
        <div>
            <div className="bg-slate-600 text-white p-3 mb-16">
                <h3 className="text-3xl">You find yourself in the middle of a bar brawl.</h3>
                <h3 className="text-3xl">Which weapon would you prefer to brandish?</h3>
            </div>

            <div className='grid grid-cols-2 text-xl justify-between gap-10 mb-20 text-white' >
                <div className="group">
                        <input
                            type="radio"
                            value="Two-Handed Sword"
                            id="two-handed-sword"
                            checked={weapon === "Two-Handed Sword"}
                            onChange={(e) => setWeapon(e.target.value)}
                            className="mr-4 w-6 h-6 align-middle accent-radioYellow"
                        />
                        <label
                            htmlFor="two-handed-sword"
                            className={`cursor-pointer p-2 rounded-md ${weapon === "Two-Handed Sword" ? "border-4 border-solid border-ceptor p-2" : ""
                                }`}
                        >
                            Two-Handed Sword
                        </label>
                    </div>
                    <div>
                        <input
                        type="radio"
                        value="Bastard Sword"
                        id="bastard-sword"
                        checked={weapon === "Bastard Sword"}
                        onChange={(e) => setWeapon(e.target.value)}
                        className="mr-4 w-6 h-6 align-middle accent-radioYellow"
                        />
                        <label
                            htmlFor="bastard-sword"
                            className={`cursor-pointer p-2 rounded-md ${weapon === "Bastard Sword" ? "border-4 border-solid border-ceptor p-2" : ""
                                }`}
                        >
                            Bastard Sword
                        </label>
                    </div>
                    <div>
                    <input
                        type="radio"
                        value="Bo Staff"
                        id="bo-staff"
                        checked={weapon === "Bo Staff"}
                        onChange={(e) => setWeapon(e.target.value)}
                        className="mr-4 w-6 h-6 align-middle accent-radioYellow"
                    />
                    <label
                        htmlFor="bo-staff"
                        className={`cursor-pointer p-2 rounded-md ${weapon === "Bo Staff" ? "border-4 border-solid border-ceptor p-2" : ""
                            }`}
                    >
                        Bo Staff
                    </label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            value="Halberd"
                            id="halberd"
                            checked={weapon === "Halberd"}
                            onChange={(e) => setWeapon(e.target.value)}
                            className="mr-4 w-6 h-6 align-middle accent-radioYellow"
                        />
                        <label
                            htmlFor="halberd"
                            className={`cursor-pointer p-2 rounded-md ${weapon === "Halberd" ? "border-4 border-solid border-ceptor p-2" : ""
                                }`}
                        >
                            Halberd
                        </label>
                    </div>
                    <div>
                            <input
                                type="radio"
                                value="Throwing Knives"
                                id="throwing-knives"
                                checked={weapon === "Throwing Knives"}
                                onChange={(e) => setWeapon(e.target.value)}
                                className="mr-4 w-6 h-6 align-middle accent-radioYellow"
                            />
                            <label
                                htmlFor="throwing-knives"
                                className={`cursor-pointer p-2 rounded-md ${weapon === "Throwing Knives" ? "border-4 border-solid border-ceptor p-2" : ""
                                    }`}
                            >
                                Throwing Knives
                            </label>
                    </div>
                    <div>
                            <input
                                type="radio"
                                value="Spiked Mace"
                                id="spiked-mace"
                                checked={weapon === "Spiked Mace"}
                                onChange={(e) => setWeapon(e.target.value)}
                                className="mr-4 w-6 h-6 align-middle accent-radioYellow"
                            />
                            <label
                                htmlFor="spiked-mace"
                                className={`cursor-pointer p-2 rounded-md ${weapon === "Spiked Mace" ? "border-4 border-solid border-ceptor p-2" : ""
                                    }`}
                            >
                                Spiked Mace
                            </label>
                    </div>
                    <div>
                            <input
                                type="radio"
                                value="Cross Bow"
                                id="cross-bow"
                                checked={weapon === "Cross Bow"}
                                onChange={(e) => setWeapon(e.target.value)}
                                className="mr-4 w-6 h-6 align-middle accent-radioYellow"
                            />
                            <label
                                htmlFor="cross-bow"
                                className={`cursor-pointer p-2 rounded-md ${weapon === "Cross Bow" ? "border-4 border-solid border-ceptor p-2" : ""
                                    }`}
                            >
                                Cross Bow
                            </label>
                    </div>
                </div>
            </div>
    )
}