import React from "react";
import BuyDiceCover from "../components/BuyDicePage/BuyDiceCover";
import GetDice from "../components/BuyDicePage/GetDice";
import ManageDice from "../components/BuyDicePage/ManageDice";

export default function BuyDice() {
  return (
    <div className="flex flex-col justify-center items-center ">
      <BuyDiceCover></BuyDiceCover>
      <GetDice></GetDice>
      <ManageDice></ManageDice>
    </div>
  );
}
