import React from "react";
import buttonImage from "../../public/images/CREATE-hero/buttonImage.png";
import Image from "next/image";

const StartButton = ({ setConditionalRender }) => {
  return (
    <div
      className="h-32 w-32 mx-auto cursor-pointer"
      onClick={() => setConditionalRender(true)}
    >
      <div className="relative text-center text-2xl mx-auto">
        <p>Press</p>
      </div>
      <a>
        <Image src={buttonImage} alt="button image"/>
        <div className="relative bottom-10 text-black text-3xl left-8 mx-auto">
          <p>Start</p>
        </div>
      </a>
      <div className="relative bottom-8 text-xs whitespace-nowrap right-28 text-justify">
        <p>GRAB A COPY OF YOUR CHARACTER SHEET AND MAKE ART</p>
      </div>
    </div>
  );
};

export default StartButton;
