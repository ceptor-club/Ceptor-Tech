import React from "react";
import Vector2 from "../public/images/CREATE-hero/Vector2.png";
import Image from "next/image";
// import { Oswald } from '@next/font/google'

// const oswald = Oswald({ weight: '700', subsets: ['latin'] });

const VectorImage = () => {
  return (
    <>
      <Image src={Vector2} alt="Vector" />
      <div
        className={` ${oswald.className} relative bottom-60 pl-2 mx-auto text-4xl`}
      >
        <p className="">
          <strong>Build</strong> character,{" "}
        </p>
      </div>
      <div className="relative bottom-56 left-8 mx-auto text-4xl">
        <p>
          <strong>SAVE THE WORLD</strong>
        </p>
      </div>
      <div className="relative bottom-52 pl-2 mx-auto text-xl">
        <p>Generate character art for your</p>
      </div>
      <div className="relative bottom-52 left-16 mx-aut text-xl w-64">
        <p>tabletop game in seconds</p>
      </div>
    </>
  );
};

export default VectorImage;
