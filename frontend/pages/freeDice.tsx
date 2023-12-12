import { useEffect, useMemo, useState } from "react";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";
import { Logo } from "../components/Logo";
import { ceptorDiceABI } from "../utils/abis";
import { addresses } from "../utils/addresses";

export default function FreeDice() {
  const { chain, chains } = useNetwork();
  const { address, isConnected } = useAccount();
  const [conditionalRender, setConditionalRender] = useState("");
  const [user, setUser] = useState<"gm" | "player">();
  const [amounts, setAmounts] = useState<number[]>();

  const ids = useMemo(() => {
    // TODO: get the tokenIDs form the CeptorDice.sol
    return ["0", "1", "2", "3", "4", "5"];
  }, []); // Add dependencies that trigger the recalculation of 'ids'

  // Config for minting dice
  const { config: configMint } = usePrepareContractWrite({
    address: addresses[chain?.network]?.ceptorDice,
    abi: ceptorDiceABI,
    functionName: "mintBatch",
    args: [ids, amounts],
  });

  // Hook for minting dice
  const { data, write: writeMint } = useContractWrite(configMint);

  const mintBatch = () => {
    try {
      if (!isConnected) {
        open();
      } else if (isConnected) {
        console.log("wallet is connected");
      }
      console.log("mint dice");

      console.log(ids, amounts);

      writeMint();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // TODO: get data from route, once it's connected to userflow.
    setUser("player");
    const amountArray = ids.map(() => (user === "player" ? 1 : 5));
    console.log(amountArray);
    console.log(user);
    setAmounts(amountArray);
  }, [user, ids]);

  return (
    <div className="cover flex flex-col justify-center items-center  space-y-3">
      <h1 className="font-nothing-you-could-do text-4xl uppercase pb-4">
        Now with Ceptor Dice{" "}
      </h1>
      <div>
        <Logo setConditionalRender={setConditionalRender} />
      </div>
      <div className="buy-dice-header-bg">
        <div className="align-center backpack blue content-center flex flex-col items-center justify-center">
          <button
            onClick={() => mintBatch()}
            className="free-bg font-nothing-you-could-do text-4xl uppercase text-black"
          >
            Free{" "}
          </button>
          <h1 className="font-oswald text-black-xl uppercase text-black">
            + Gas{" "}
          </h1>
          <h1 className="font-oswald text-4xl uppercase">NFT Dice </h1>
        </div>
      </div>
      <h1 className="font-oswald text-4xl uppercase">Skip </h1>
    </div>
  );
}
