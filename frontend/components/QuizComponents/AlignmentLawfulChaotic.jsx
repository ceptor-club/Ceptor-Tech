export default function AlignmentLawfulChaotic({ myAlignment, setMyAlignment }) {
    return (
        <div>
            <h3 className="bg-slate-600 text-white p-3 mb-16">Is it ok to steal from the rich to feed the poor?</h3>
            <div className='grid grid-cols-2 mt-8 text-xl gap-10 mb-20 text-white' >

                <div>
                    <input
                        type="radio"
                        value="Chaotic"
                        id="Chaotic"
                        checked={myAlignment === "Chaotic"}
                        onChange={(e) => setMyAlignment(e.target.value)}
                        className="mr-4 w-6 h-6 align-middle accent-radioYellow"
                    />
                    <label
                        htmlFor="Chaotic"
                        className={`cursor-pointer p-2 rounded-md ${myAlignment === "Chaotic" ? "border-4 border-solid border-ceptor p-2" : ""
                            }`}
                    >
                        Yes
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        value="Lawful"
                        id="Lawful"
                        checked={myAlignment === "Lawful"}
                        onChange={(e) => setMyAlignment(e.target.value)}
                        className="mr-4 w-6 h-6 align-middle accent-radioYellow"
                    />
                    <label
                        htmlFor="Lawful"
                        className={`cursor-pointer p-2 rounded-md ${myAlignment === "Lawful" ? "border-4 border-solid border-ceptor p-2" : ""
                            }`}
                    >
                        No
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        value="Neutral"
                        id="Neutral"
                        checked={myAlignment === "Neutral"}
                        onChange={(e) => setMyAlignment(e.target.value)}
                        className="mr-4 w-6 h-6 align-middle accent-radioYellow"
                    />
                    <label
                        htmlFor="Neutral"
                        className={`cursor-pointer p-2 rounded-md ${myAlignment === "Neutral" ? "border-4 border-solid border-ceptor p-2" : ""
                            }`}
                    >
                        Maybe a Little Bit...
                    </label>
                </div>
            </div>
        </div>
    )
}