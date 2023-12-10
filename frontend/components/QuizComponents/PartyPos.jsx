export default function PartyPos({ partyPos, setPartyPos }) {
  return (
    <div>
      <h3 className="text-3xl mb-4">
        You and your party ambush a group of monsters.
      </h3>
      <h3 className="text-3xl">Where do you see yourself in this fight?</h3>
      <div className="flex flex-col mt-12 text-xl space-y-8 > * + *">
        <div>
          <input
            type="radio"
            value="front"
            id="partyRole1Front"
            checked={partyPos === "front"}
            onChange={(e) => setPartyPos(e.target.value)}
            className="hidden"
          />
          <label
            htmlFor="partyRole1Front"
            className={`cursor-pointer p-2 rounded-md ${
              partyPos === "front"
                ? "border-4 border-solid border-ceptor p-2"
                : ""
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
            className="hidden"
          />
          <label
            htmlFor="partyRole1Middle"
            className={`cursor-pointer p-2 rounded-md ${
              partyPos === "middle"
                ? "border-4 border-solid border-ceptor p-2"
                : ""
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
            className="hidden"
          />
          <label
            htmlFor="partyRole1Back"
            className={`cursor-pointer p-2 rounded-md ${
              partyPos === "back"
                ? "border-4 border-solid border-ceptor p-2"
                : ""
            }`}
          >
            In the back supporting your team
          </label>
        </div>
      </div>
    </div>
  );
}
