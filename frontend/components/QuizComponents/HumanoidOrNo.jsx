export default function HumanoidOrNo({ humanoidOrNo, setHumanoidOrNo, setSpecies }) {

    function handleHumanoid(e) {
        const isHumanoid = e.target.value === "true";
        setHumanoidOrNo(isHumanoid);
        setSpecies(isHumanoid ? 'Elf' : 'Centaur');
    }

    return (
        <div>
            <div className="bg-slate-600 text-white p-3 mb-16">
                <h3 className="text-3xl mb-4">Are you interested in playing a human or humanoid character <br />or something more exotic? </h3>
            </div>
            <div className='grid grid-cols-2 mt-8 text-xl gap-10 mb-24 text-white' >
                <div>
                    <input
                        type="radio"
                        value={true}
                        id="humanoidYes"
                        checked={humanoidOrNo}
                        onChange={handleHumanoid}
                        className="mr-4 w-6 h-6 align-middle accent-radioYellow"
                    />
                    <label
                        htmlFor="humanoidYes"
                        className={`cursor-pointer p-2 rounded-md ${humanoidOrNo  ? "border-4 border-solid border-ceptor p-2" : ""
                            }`}
                    >
                        Human or humanoid please...
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        value={false}
                        id="humanoidNo"
                        checked={!humanoidOrNo}
                        onChange={handleHumanoid}
                        className="mr-4 w-6 h-6 align-middle accent-radioYellow"
                    />
                    <label
                        htmlFor="humanoidNo"
                        className={`cursor-pointer p-2 rounded-md ${!humanoidOrNo ? "border-4 border-solid border-ceptor p-2" : ""
                            }`}
                    >
                        Strange creature!
                    </label>
                </div>
            </div>
        </div>
    )
}