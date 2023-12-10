export default function AlignmentLawfulChaotic({
  myAlignment,
  setMyAlignment,
}) {
  return (
    <div>
      <h3 className="text-3xl">
        Is it ok to steal from the rich to feed the poor?
      </h3>
      <div className="flex flex-col mt-8 text-xl space-y-8 > * + *">
        <div>
          <input
            type="radio"
            value="Chaotic"
            id="Chaotic"
            checked={myAlignment === "Chaotic"}
            onChange={(e) => setMyAlignment(e.target.value)}
            className="hidden"
          />
          <label
            htmlFor="Chaotic"
            className={`cursor-pointer p-2 rounded-md ${
              myAlignment === "Chaotic"
                ? "border-4 border-solid border-ceptor p-2"
                : ""
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
            className="hidden"
          />
          <label
            htmlFor="Lawful"
            className={`cursor-pointer p-2 rounded-md ${
              myAlignment === "Lawful"
                ? "border-4 border-solid border-ceptor p-2"
                : ""
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
            className="hidden"
          />
          <label
            htmlFor="Neutral"
            className={`cursor-pointer p-2 rounded-md ${
              myAlignment === "Neutral"
                ? "border-4 border-solid border-ceptor p-2"
                : ""
            }`}
          >
            Maybe a Little Bit...
          </label>
        </div>
      </div>
    </div>
  );
}
