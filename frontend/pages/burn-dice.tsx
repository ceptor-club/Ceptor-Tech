import { useState } from "react";
import Image from "next/image";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";
import { ceptorABI, ceptorDiceABI } from "../utils/abis";
import { addresses } from "../utils/addresses";

export default function BurnDice() {
  const { chain, chains } = useNetwork();
  const { address, isConnected } = useAccount();
  const [minutes, setMinutes] = useState(0);
  const [dice, setDice] = useState("");
  const [userBag, setUserBag] = useState({
    "4": 0,
    "6": 0,
    "8": 0,
    "10": 0,
    "12": 0,
    "20": 0,
  });
  // TODO: get the amount of dice of user
  // TODO: replace with real user data

  const { data: userTimerRead } = useContractRead({
    address: addresses[chain?.network]?.ceptors,
    abi: ceptorABI,
    functionName: "userTimers",
    args: [address],
    watch: true,
  });

  // Config for burning dice
  const { config: configBurn } = usePrepareContractWrite({
    address: addresses[chain?.network]?.ceptorDice as any,
    abi: ceptorDiceABI,
    functionName: "burn",
    args: [address, dice, "1"],
  });

  // Hook for burning dice
  const { data, write: writeBurn } = useContractWrite(configBurn);

  const burn = () => {
    try {
      if (!isConnected) {
        open();
      } else if (isConnected) {
        console.log("wallet is connected");
      }
      console.log("mint dice");

      writeBurn();
    } catch (error) {
      console.log(error);
    }
  };

  const selectDice = (key: string) => {
    if (minutes === 0) {
      setUserBag((userBag) => ({ ...userBag, [key]: userBag[key] - 1 }));
      setMinutes(minutes + Number(key));
      setDice(key);
    }
  };

  return (
    <div className="bottom flex flex-col items-center space-y-10 ">
      <h1 className="font-nothing-you-could-do text-4xl uppercase ">
        Manage Dice{" "}
      </h1>
      <h1 className="font-milonga text-light-yellow uppercase text-4xl">
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
        <div className="flex flex-row  ">
          {Object.entries(userBag).map(([key, value]) => (
            <div className="flex flex-col m-2" key={key}>
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
