export default function HumanoidOrNo({ humanoidOrNo, setHumanoidOrNo, setSpecies }) {

    function handleHumanoid(e) {
        const isHumanoid = e.target.value === "true";
        setHumanoidOrNo(isHumanoid);
        setSpecies(isHumanoid ? 'Elf' : 'Centaur');
    }

    return (
        <div>
            <div className="text-white p-3 mb-10">
                <h3 className="text-3xl">Are you interested in playing a human or humanoid character or something more exotic? </h3>
            </div>
            <div className='flex flex-col text-xl justify-between gap-6 mb-20 text-white' >
                <div>
                    <input
                        type="radio"
                        value={true}
                        id="humanoidYes"
                        checked={humanoidOrNo}
                        onChange={handleHumanoid}
                        className="mr-4 w-6 h-6 align-middle accent-customYellow"
                    />
                    <label
                        htmlFor="humanoidYes"
                        className={`cursor-pointer p-2 rounded-md ${humanoidOrNo  ? "border-4 border-solid border-customYellow p-2" : ""
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
                        className="mr-4 w-6 h-6 align-middle accent-customYellow"
                    />
                    <label
                        htmlFor="humanoidNo"
                        className={`cursor-pointer p-2 rounded-md ${!humanoidOrNo ? "border-4 border-solid border-customYellow p-2" : ""
                            }`}
                    >
                        Strange creature!
                    </label>
                </div>
            </div>
        </div>
    )
}