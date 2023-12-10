import Image from "next/image";
import { useMemo, useState } from "react";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";
import { ceptorDiceABI } from "../utils/abis";
import { addresses } from "../utils/addresses";

export default function BurnDice() {
  const { chain, chains } = useNetwork();
  const { address, isConnected } = useAccount();
  const [minutes, setMinutes] = useState(0);
  const [dice, setDice] = useState(0);
  // TODO: get the amount of dice of user
  // TODO: replace with real user data
  const [userBag, setUserBag] = useState({
    "4": 8,
    "6": 2,
    "8": 2,
    "10": 2,
    "12": 1,
    "20": 2,
  });

  // Config for minting dice
  const { config: configMint } = usePrepareContractWrite({
    address: addresses[chain?.network]?.ceptorDice as any,
    abi: ceptorDiceABI,
    functionName: "burn",
    args: [address, "1", "1"],
  });

  // Hook for minting dice
  const { data, write: writeMint } = useContractWrite(configMint);

  const burn = () => {
    try {
      if (!isConnected) {
        open();
      } else if (isConnected) {
        console.log("wallet is connected");
      }
      console.log("mint dice");

      writeMint();
    } catch (error) {
      console.log(error);
    }
  };

  const selectDice = (key: string) => {
    if (minutes === 0) {
      setUserBag((userBag) => ({ ...userBag, [key]: userBag[key] - 1 }));
      setMinutes(minutes + Number(key));
    }
  };

  return (
    <div className="bottom flex flex-col items-center space-y-10 ">
      <h1 className="font-nothing-you-could-do text-4xl uppercase ">
        Manage Dice{" "}
      </h1>
      <h1 className="font-milonga text-black-xl uppercase text-4xl">
        Your Dice{" "}
      </h1>
      <div>
        <Image
          src="/images/CREATE/flame-burn.jpeg"
          alt=""
          width={200}
          height={200}
          className="top-0 left-0  object-cover min-h-full min-w-full"
        />
      </div>
      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-col">
          <p className="font-oswald">$</p>
          <p className="font-oswald uppercase">Buy</p>
          <p className="font-oswald uppercase m-5 pt-5">Time</p>
        </div>
        <div className="flex flex-row space-x-5 ">
          {Object.entries(userBag).map(([key, value]) => (
            <div className="flex flex-col m-5" key={key}>
              <button onClick={() => selectDice(key)} className="">
                <p className="font-oswald bg-white text-black p-5 rounded-xl">
                  {value}
                </p>
              </button>

              <p className="font-oswald color-white text-white mt-10 uppercase">
                {key + " Min"}
              </p>
            </div>
          ))}
        </div>
      </div>
      <p className="font-oswald text-1xl text-orange">
        Select and burn a die to continue to The Creator...
      </p>
      <div className="flex flex-col justify-center space-y-5">
        <p className="font-oswald text-3xl text-orange-500">
          {minutes + " Minutes"}
        </p>
        <button
          className="bg-orange-500 pl-3 pr-3 pt-1  text-2xl rounded-lg text-black font-nothing-you-could-do"
          onClick={() => burn()}
        >
          Burn
        </button>
      </div>
    </div>
  );
}
