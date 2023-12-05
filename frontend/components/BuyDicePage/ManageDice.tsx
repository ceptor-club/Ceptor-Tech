import Image from "next/image";
import { useState } from "react";

export default function ManageDice() {
  // TODO: get the amount of dice of user

  const [minutes, setMinutes] = useState(0);
  const [userBag, setUserBag] = useState({
    "20": 2,
    "12": 1,
    "10": 2,
    "8": 2,
    "6": 2,
    "4": 8,
  });

  const selectDice = (key: string) => {
    setUserBag((userBag) => ({ ...userBag, [key]: userBag[key] - 1 }));
    setMinutes(minutes + userBag[key]);
  };
  const burn = async () => {
    // TODO: burn dices
  };

  return (
    <div className="mid-part flex flex-col items-center space-y-10 ">
      <h1 className="font-nothing-you-could-do text-7xl uppercase ">
        Manage Dice{" "}
      </h1>
      <h1 className="font-milonga text-black-xl uppercase text-7xl">
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
        <div className="flex flex-row-reverse space-x-5 ">
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
