export default function AlignmentGoodEvil({ setMyAlignment, myAlignment }) {
  function handleAlignmentChange(secondPart) {
    const alignmentParts = myAlignment.split(" ");
    if (alignmentParts[1]) {
      alignmentParts[1] = secondPart;
      const alignment = alignmentParts.join(" ");
      setMyAlignment(alignment);
    } else {
      setMyAlignment((myAlignment) => myAlignment + " " + secondPart);
    }
  }
  return (
    <div>
      <h3 className="text-3xl">
        Which quest seems the most worthy of your time?
      </h3>
      <div className="flex flex-col mt-8 text-xl space-y-8 > * + *">
        <div>
          <input
            type="radio"
            value="Good"
            id="Good"
            checked={
              myAlignment === "Good" ||
              myAlignment === "Chaotic Good" ||
              myAlignment === "Nuetral Good" ||
              myAlignment === "Lawful Good"
            }
            onChange={(e) => handleAlignmentChange(e.target.value)}
            className="hidden"
          />
          <label
            htmlFor="Good"
            className={`cursor-pointer p-2 rounded-md ${
              myAlignment === "Good" ||
              myAlignment === "Chaotic Good" ||
              myAlignment === "Nuetral Good" ||
              myAlignment === "Lawful Good"
                ? "border-4 border-solid border-ceptor p-2"
                : ""
            }`}
          >
            Defending helpless villagers against a group of cruel raiders.
          </label>
        </div>

        <div>
          <input
            type="radio"
            value="Neutral"
            id="Neutral"
            checked={
              myAlignment === "Chaotic Neutral" ||
              myAlignment === "Nuetral Nuetral" ||
              myAlignment === "Lawful Neutral"
            }
            onChange={(e) => handleAlignmentChange(e.target.value)}
            className="hidden"
          />
          <label
            htmlFor="Neutral"
            className={`cursor-pointer p-2 rounded-md ${
              myAlignment === "Chaotic" ||
              myAlignment === "Lawful" ||
              myAlignment === "Neutral" ||
              myAlignment === "Chaotic" ||
              myAlignment === "Chaotic Neutral" ||
              myAlignment === "Nuetral Nuetral" ||
              myAlignment === "Lawful Neutral"
                ? "border-4 border-solid border-ceptor p-2"
                : ""
            }`}
          >
            Slaying a vicious ogre and taking his gold.
          </label>
        </div>

        <div>
          <input
            type="radio"
            value="Evil"
            id="Evil"
            checked={
              myAlignment === "Evil" ||
              myAlignment === "Chaotic Evil" ||
              myAlignment === "Nuetral Evil" ||
              myAlignment === "Lawful Evil"
            }
            onChange={(e) => handleAlignmentChange(e.target.value)}
            className="hidden"
          />
          <label
            htmlFor="Evil"
            className={`cursor-pointer p-2 rounded-md ${
              myAlignment === "Evil" ||
              myAlignment === "Chaotic Evil" ||
              myAlignment === "Nuetral Evil" ||
              myAlignment === "Lawful Evil"
                ? "border-4 border-solid border-ceptor p-2"
                : ""
            }`}
          >
            Recovering a cursed ring that will grant you the power to enslave
            others.
          </label>
        </div>
      </div>
    </div>
  );
}
