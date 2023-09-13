import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
// import midPageImage from "../public/images/CREATE-midPage/midPageImage.png";
import VectorImage from "./VectorImage";
import PDFParser from "./PDFParser";
// import Options from "../public/images/CREATE/Options.png";

export default function GenerateHero({
  setPdfData,
  pdfData,
  setError,
  setConditionalRender,
}) {
  return (
    <div>
      <div className='relative flex justify-center'>
        <div className='relative w-full max-h-screen'>
          <Image
            src={"/images/CREATE-midPage/midPageImage.png"}
            alt='midPage'
            className='object-cover h-screen'
          />

          <div className='absolute object-contain inset-x-0 top-36 right-4 mx-auto flex justify-center w-3/6'>
            <PDFParser
              setPdfData={setPdfData}
              pdfData={pdfData}
              setError={setError}
            />
          </div>
          <div className='absolute inset-x-0 bottom-24 w-96 mx-auto cursor-pointer'>
            <Image src={"/images/CREATE/Options.png"} alt='options' />
          </div>
          <div className='absolute inset-x-0 bottom-14 w-96 left-56 font-extralight text-sm mx-auto'>
            <p>SELECT UPLOAD TYPE</p>
          </div>
        </div>
      </div>
    </div>
  );
}
