export default function HumanoidOrNo({
  humanoidOrNo,
  setHumanoidOrNo,
  setSpecies,
}) {
  function handleHumanoid(e) {
    const isHumanoid = e.target.value === "true";
    setHumanoidOrNo(isHumanoid);
    setSpecies(isHumanoid ? "Elf" : "Centaur");
  }

  return (
    <div>
      <h3 className="text-3xl mb-4">
        Are you interested in playing a human or humanoid character{" "}
      </h3>
      <h3 className="text-3xl mb-4">or something more exotic?</h3>
      <div className="flex flex-col mt-12 text-xl space-y-8 > * + *">
        <div>
          <input
            type="radio"
            value={true}
            id="humanoidYes"
            checked={humanoidOrNo}
            onChange={handleHumanoid}
            className="hidden"
          />
          <label
            htmlFor="humanoidYes"
            className={`cursor-pointer p-2 rounded-md ${
              humanoidOrNo ? "border-4 border-solid border-ceptor p-2" : ""
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
            className="hidden"
          />
          <label
            htmlFor="humanoidNo"
            className={`cursor-pointer p-2 rounded-md ${
              !humanoidOrNo ? "border-4 border-solid border-ceptor p-2" : ""
            }`}
          >
            Strange creature!
          </label>
        </div>
      </div>
    </div>
  );
}
