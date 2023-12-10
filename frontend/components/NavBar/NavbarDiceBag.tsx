import Image from "next/image";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";

const NavbarDiceBag = ({
  diceBalance,
}: {
  diceBalance: {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}) => {
  const [resultMinutes, setResultMinutes] = useState(0);
  useEffect(() => {
    const resultMinutes = Object.keys(diceBalance).reduce(
      (accumulator, key) => {
        const numericKey = Number(key);
        return accumulator + numericKey * diceBalance[key];
      },
      0
    );

    setResultMinutes(resultMinutes);
  }, [diceBalance]);

  return (
    <div className="flex flex-row justify-center items-center space-x-3">
      <div className="backpack-tiny flex flex-col justify-center items-center  mb-2">
        <p className="bg-white rounded-sm text-black px-2 py-1 mx-1 text-xs">
          {resultMinutes || 0}
        </p>
      </div>
      <div className="dice-bar rounded-xl flex flex-row  items-center  text-black bg-blue-50">
        {Object.entries(diceBalance).map(([key, value]) => (
          <div key={key}>
            {value > 0 && (
              <p className="bg-white rounded-sm px-2 py-1 mx-1 text-xs">
                {value}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavbarDiceBag;
