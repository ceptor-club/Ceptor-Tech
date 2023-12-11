import React, { useState, useContext } from "react";
import { Logo } from "../components/Logo";
// import { CharacterContext } from "../components/CharacterModule/CharacterContext";
import Meta from "../components/Meta";
import { CharacterStatsFull } from "../components/CharacterModule/CharacterStatsFull";
import Image from "next/image";

export default function Profile() {
  // const { characterData } = useContext(CharacterContext);
  // const [fullCharacterData, setFullCharacterData] = useState(characterData);
  const [conditionalRender, setConditionalRender] = useState("");

  const exportCharacterData = () => {
    // const dataStr = JSON.stringify(characterData);
    const dataUri =
      // "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    // let exportFileDefaultName = "character_data.json";
    // let linkElement = document.createElement("a");
    // linkElement.setAttribute("href", dataUri);
    // linkElement.setAttribute("download", exportFileDefaultName);
    // linkElement.click();
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="z-10">Version 0.11.28*</p>
      <p className="z-10">{"*Fall Profile, now with 1128% more Stats! :D"}</p>
      <button
        className="relative flex justify-center text-center align-center mt-6 cursor-pointer w-80 h-28 m-4"
        onClick={exportCharacterData}
      >
        <Image
          src="/images/Buttons/generateBackground2.png"
          alt=""
          width={200}
          height={120}
          className="absolute my-auto w-full h-full bottom-[2px] left-[2px] -z-20"
        />
        <div className="flex justify-center items-center text-4xl text-white">
          Export My Sheet
        </div>
      </button>
      make a button like in Create page called Make a Scannable Sheet that pops
      an alert saying add this scannable!
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          alert("Add this scannable");
        }}
      >
        Make a Scannable Sheet
      </button>
      <CharacterStatsFull />
    </div>
  );
}
