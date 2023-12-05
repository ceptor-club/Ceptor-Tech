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
    <div className=" mid-part flex flex-col items-center space-y-10">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-nothing-you-could-do text-4xl uppercase mb-10">
          Buy Dice
        </h1>
        <h1 className="font-milonga text-2xl uppercase text-light-yellow">
          Limited Edition Free*
        </h1>
        <h1 className="font-oswald text-7xl uppercase font-bold">
          Ceptor Dice
        </h1>
      </div>
      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-col space-x-5">
          <div>
            <p className="font-oswald">$</p>
            <p className="font-oswald uppercase">Buy</p>
          </div>
          <p className="font-oswald uppercase m-5">Time</p>
        </div>
        <div className="flex flex-row-reverse space-x-5">
          {Object.entries(userBag).map(([key, value], index) => (
            <div className="flex flex-col m-5" key={key}>
              <div className={`dice-${index}`}>
                <button className="relative mb-5" onClick={() => addValue(key)}>
                  {" "}
                  <Image
                    src="/images/CREATE-dice/arrow-up.png"
                    alt=""
                    width={15}
                    height={10}
                    className="object-cover min-h-full min-w-full m-4"
                  />
                </button>
                <p className="font-oswald bg-white text-black p-5 rounded-xl z-1">
                  {value}
                </p>
                <button
                  className="relative mt-5"
                  onClick={() => decreaseValue(key)}
                >
                  <Image
                    src="/images/CREATE-dice/arrow-down.png"
                    alt=""
                    width={15}
                    height={10}
                    className="  object-cover min-h-full min-w-full m-4"
                  />
                </button>
              </div>
              <p className="font-oswald color-white text-white mt-10 uppercase">
                {key + "Min"}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-center items-center  space-y-10 flex-auto flex-wrap">
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
        <div className="flex flex-col  justify-center items-center">
          <p className="uppercase font-oswald text-l">Your dice shopping bag</p>
          <div className="backpack-small flex flex-col text-black justify-center items-center">
            <p className="font-oswald text-xs uppercase">QTY</p>
            <p className="font-oswald text-3xl">{quantity}</p>
            <p className="font-oswald text-xl uppercase">{minutes} Min</p>
            <p className="font-oswald text-grey text-xs uppercase">
              Total Time
            </p>
          </div>
          <p className="uppercase font-oswald text-m">Max 10 Dice</p>
        </div>
        <div className="align-center flex flex-col justify-center items-center space-y-3">
          <button
            className="free-bg font-nothing-you-could-do text-4xl uppercase text-black"
            onClick={() => buyDice()}
          >
            Buy
          </button>
          <div className=" flex flex-col text-lg justify-center items-center mb-1">
            <div className="flex flex-row">
              <p className="font-oswald text-l uppercase">Price:&nbsp;</p>
              <p className="text-light-yellow font-oswald ">$0.00 USD</p>
            </div>
            <p className="font-oswald text-l uppercase">estimated gas :</p>
            <p className="font-oswald text-grey text-xs uppercase font-thin">
              (Less Than $0.01 USD)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
