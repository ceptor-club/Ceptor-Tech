export default function Interest({ interest, setInterest }) {
    return (
        <div >
            <h3 className="text-3xl text-white p-3 mb-8">Which activity sounds like the most fun?</h3>
            <div className='grid grid-cols-2 text-xl gap-4 w-auto mb-20 text-white' >
                <div>
                    <input
                        type="radio"
                        value="interestStr"
                        id="interestStr"
                        checked={interest === "interestStr"}
                        onChange={(e) => setInterest(e.target.value)}
                        className="mr-4 w-6 h-6 align-middle accent-customYellow"
                    />
                    <label
                        htmlFor="interestStr"
                        className={`cursor-pointer p-2 rounded-md ${interest === "interestStr" ? "border-4 border-solid border-customYellow p-2" : ""
                            }`}
                    >
                        Lifting Weights
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        value="interestDex"
                        id="interestDex"
                        checked={interest === "interestDex"}
                        onChange={(e) => setInterest(e.target.value)}
                        className="mr-4 w-6 h-6 align-middle accent-customYellow"
                    />
                    <label
                        htmlFor="interestDex"
                        className={`cursor-pointer p-2 rounded-md ${interest === "interestDex" ? "border-4 border-solid border-customYellow p-2" : ""
                            }`}
                    >
                        Doing Yoga
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        value="interestCon"
                        id="interestCon"
                        checked={interest === "interestCon"}
                        onChange={(e) => setInterest(e.target.value)}
                        className="mr-4 w-6 h-6 align-middle accent-customYellow"
                    />
                    <label
                        htmlFor="interestCon"
                        className={`cursor-pointer p-2 rounded-md ${interest === "interestCon" ? "border-4 border-solid border-customYellow p-2" : ""
                            }`}
                    >
                        Eating Contest
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        value="interestInt"
                        id="interestInt"
                        checked={interest === "interestInt"}
                        onChange={(e) => setInterest(e.target.value)}
                        className="mr-4 w-6 h-6 align-middle accent-customYellow"
                    />
                    <label
                        htmlFor="interestInt"
                        className={`cursor-pointer p-2 rounded-md ${interest === "interestInt" ? "border-4 border-solid border-customYellow p-2" : ""
                            }`}
                    >
                        Reading a Book
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        value="interestWis"
                        id="interestWis"
                        checked={interest === "interestWis"}
                        onChange={(e) => setInterest(e.target.value)}
                        className=" w-6 h-6 align-middle accent-customYellow"
                    />
                    <label
                        htmlFor="interestWis"
                        className={`cursor-pointer p-2 rounded-md ${interest === "interestWis" ? "border-2 border-solid border-customYellow p-2" : ""
                            }`}
                    >
                        Listening to Stories from an Elder
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        value="interestCha"
                        id="interestCha"
                        checked={interest === "interestCha"}
                        onChange={(e) => setInterest(e.target.value)}
                        className="mr-4 w-6 h-6 align-middle accent-customYellow"
                    />
                    <label
                        htmlFor="interestCha"
                        className={`cursor-pointer p-2 rounded-md ${interest === "interestCha" ? "border-4 border-solid border-customYellow p-2" : ""
                            }`}
                    >
                        Performing on Stage
                    </label>
                </div>
            </div>
        </div>
    )
}