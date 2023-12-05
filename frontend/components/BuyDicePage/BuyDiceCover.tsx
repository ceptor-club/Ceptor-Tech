import { useState } from "react";
import { Logo } from "../Logo";

export default function BuyDiceCover() {
  const [conditionalRender, setConditionalRender] = useState("");

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
          <h1 className="free-bg font-nothing-you-could-do text-4xl uppercase text-black">
            Free{" "}
          </h1>
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
