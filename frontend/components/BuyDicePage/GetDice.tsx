import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function GetDice() {
  const [quantity, setQuantity] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [userBag, setUserBag] = useState({
    "20": 0,
    "12": 0,
    "10": 0,
    "8": 0,
    "6": 0,
    "4": 0,
  });

  const addValue = (key: string) => {
    console.log(key);
    console.log(userBag[key]);

    const newValue = userBag[key] + 1;
    setUserBag((userBag) => ({ ...userBag, [key]: newValue }));
    console.log(userBag);
  };

  const decreaseValue = (key: string) => {
    userBag[key] -= 1;
  };

  useEffect(() => {
    const resultMinutes = Object.keys(userBag).reduce((accumulator, key) => {
      const numericKey = Number(key);
      return accumulator + numericKey * userBag[key];
    }, 0);

    const resultQuantity = Object.keys(userBag).reduce((accumulator, key) => {
      return accumulator + userBag[key];
    }, 0);

    setMinutes(resultMinutes);
    setQuantity(resultQuantity);
  }, [userBag]);

  const buyDice = async () => {
    // TODO: add function to buy dice
  };

  return (
    <div className="padding-top-10  mid-part flex flex-col items-center space-y-10">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-nothing-you-could-do text-4xl uppercase">
          Buy Dice
        </h1>
        <h1 className="font-milonga text-7xl uppercase">
          Limited Edition Free*
        </h1>
        <h1 className="font-oswald text-7xl uppercase">Ceptor Dice</h1>
      </div>
      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-col">
          <p className="font-oswald">$</p>
          <p className="font-oswald uppercase">Buy</p>
          <p className="font-oswald uppercase m-5">Time</p>
        </div>
        <div className="flex flex-row-reverse space-x-5">
          {Object.entries(userBag).map(([key, value]) => (
            <div className="flex flex-col m-5" key={key}>
              <button className="relative" onClick={() => addValue(key)}>
                {" "}
                <Image
                  src="/images/Buttons/button-up.svg"
                  alt=""
                  width={200}
                  height={10}
                  className="absolute top-0 left-0  object-cover min-h-full min-w-full"
                />
              </button>
              <p className="font-oswald bg-white text-black p-5 rounded-xl">
                {value}
              </p>
              <button
                className="relative -mt-4"
                onClick={() => decreaseValue(key)}
              >
                <Image
                  src="/images/Buttons/button-down.svg"
                  alt=""
                  width={200}
                  height={10}
                  className="absolute  left-0  object-cover min-h-full min-w-full"
                />
              </button>

              <p className="font-oswald color-white text-white mt-10 uppercase">
                {key + "Min"}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-center items-center  space-y-10 flex-auto">
        <div className="flex flex-col w-1/4">
          <p className="font-oswald text-xl">
            Fill your bag. For a limited time only. Free* NFT Dice that do some
            really fun stuff. Try out our app and mint your collectibles before
            time runs out and become a part of the race to MVP. Read the Contest
            & NFT Dice pages for more details.
          </p>
          <p className="font-oswald text-l">
            *NFT Dice are still subject to the gas associated with the
            blockchain they mint to.
          </p>
        </div>
        <div className="flex flex-col  ">
          <p className="uppercase font-oswald text-l">Your dice shopping bag</p>
          <div className=" flex flex-col">
            <p className="font-oswald text-l uppercase">QTY</p>
            <p className="font-oswald text-3xl">{quantity}</p>
            <p className="font-oswald text-2xl uppercase">{minutes} Min</p>
            <p className="font-oswald text-grey text-m uppercase">Total Time</p>
          </div>
          <p className="uppercase font-oswald text-m">Max 10 Dice</p>
        </div>
        <div className="flex flex-col ">
          <button
            className="buy-dice-button-bg font-nothing-you-could-do text-4xl uppercase"
            onClick={() => buyDice()}
          >
            Buy
          </button>
          <div className=" flex flex-col">
            <p className="font-oswald text-l uppercase">Price: $0.00 USD </p>
            <p className="font-oswald text-l ">estimated gas :</p>
            <p className="font-oswald text-grey text-l uppercase">
              (Less Than $0.01 USD)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
