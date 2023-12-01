
import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { createPrompt } from '../../utils/promptGen';
import AdvancedButton from '../Buttons/AdvancedButton';
import { CONSTANTS } from '../../utils/CONSTANTS';
import Image from 'next/image';
import { CharacterContext } from './CharacterContext';
import Tooltip from "../ToolTip";
import InfoIcon from "../InfoIcon";

const characterStatsTT =
  "Here's what we're working with from your stat sheet. You can customize it prior to generating, or edit it later in \"Advanced\"";


const CharacterStats = ({
  pdfData,
  prompt,
  setPrompt,
  setError,
  setPdfData,
  imageResult,
  advanced,
}) => {
  const { characterData } = useContext(CharacterContext)
  useEffect(() => {
    if (!advanced && pdfData) {
       console.log("pdfData: ", pdfData); 
      //create text prompt using pdfData and other data
      const prompt = createPrompt(pdfData);
      setPrompt(prompt);
      setError(null);
    }
    if (characterData.myClass !== pdfData.class) {
      setPdfData({ ...pdfData, class: characterData.myClass })
    }
    if (characterData.background !== pdfData.background) {
      setPdfData({ ...pdfData, background: characterData.background })
    }
    if (characterData.myAlignment !== pdfData.alignment) {
      setPdfData({...pdfData, alignment: characterData.myAlignment})
    }
    if(characterData.gender !== pdfData.gender) {
      if (characterData.gender === "He" && pdfData.gender === '') {
        setPdfData({...pdfData, gender: "He / Him"})
      } else if (characterData.gender === "She" && pdfData.gender === '') {
        setPdfData({...pdfData, gender: "She / Hers"})
      } else if (characterData.gender === "They" && pdfData.gender === '') {
        setPdfData({...pdfData, gender: "They / Them"})
      }
    }
    console.log(pdfData)
  });

  const handleClassSelect = (e) => {
    const input = document.getElementById("classInput");
    if (
      document.getElementById("classCheck").checked === true &&
      input.value !== ""
    ) {
      setPdfData({ ...pdfData, class: input.value });
    } else {
      setPdfData({ ...pdfData, class: "" });
    }
  };

  const handleArmorSelect = (e) => {
    const input = document.getElementById("armorInput");
    if (
      document.getElementById("armorCheck").checked === true &&
      input.value !== ""
    ) {
      setPdfData({ ...pdfData, armorWorn: input.value });
    } else {
      setPdfData({ ...pdfData, armorWorn: "" });
    }
  };

  const handleBackgroundSelect = (e) => {
    const input = document.getElementById("backgroundInput");
    if (
      document.getElementById("backgroundCheck").checked === true &&
      input.value !== ""
    ) {
      setPdfData({ ...pdfData, background: input.value });
    } else {
      setPdfData({ ...pdfData, background: "" });
    }
  };

  const handleAlignmentSelect = (e) => {
    const input = document.getElementById("alignmentInput");
    if (document.getElementById("alignmentCheck").checked === true) {
      setPdfData({ ...pdfData, alignment: input.value });
    } else {
      setPdfData({ ...pdfData, alignment: "" });
    }
  };

  const handleFeatureSelect = (e) => {
    const input = document.getElementById("featureInput");
    if (
      document.getElementById("featureCheck").checked === true &&
      input.value !== ""
    ) {
      setPdfData({ ...pdfData, feature: input.value });
    } else {
      setPdfData({ ...pdfData, feature: "" });
    }
  };

  const handleColorSelect = (e) => {
    const input = document.getElementById("colorInput");
    setPdfData(input.value);
    if (document.getElementById("colorCheck").checked === true) {
      setPdfData({ ...pdfData, color: input.value });
    } else {
      setPdfData({ ...pdfData, color: "" });
    }
  };

  const handleGenderSelect = (e) => {
    const input = document.getElementById("genderInput");
    setPdfData(input.value);
    if (document.getElementById("genderCheck").checked === true) {
      setPdfData({ ...pdfData, gender: input.value });
    } else {
      setPdfData({ ...pdfData, gender: "" });
    }
  };

  return (
    <>
      {!imageResult ? (
        <>
          <div className="relative px-6 py-10">
            <Image
              src="/images/CREATE/char-stat-bg.svg"
              alt=""
              width={100}
              height={100}
              className="absolute top-0 left-0 -z-10 object-cover min-h-full min-w-full"
            />
            <div
              className={`${
                imageResult ? "grayscale" : ""
              } text-sm relative top-0 text-white sm:w-full opacity-in opacity-load`}
            >
              <h4 className="text-center text-2xl pt-4">Character Stats</h4>

              <p className="mx-[48px] mb-2 mt-4">ON</p>
              <div className="h-full">
                <div className="flex items-center mx-[48px] mt-2 mb-4">
                  <input
                    type="checkbox"
                    className="checkbox-stats"
                    checked
                    readOnly
                    disabled={imageResult}
                  ></input>
                  <p className="mx-4">(LOCKED) SYSTEM: D&D 5e</p>
                </div>
                <div className="flex items-center mx-[48px] mt-2 mb-4">
                  <input
                    type="checkbox"
                    className="checkbox-stats"
                    checked
                    readOnly
                    disabled={imageResult}
                  ></input>
                  <p className="mx-4">(LOCKED) RACE: Dragonborn</p>
                </div>
                <div className="flex items-center mx-[48px] mt-2 mb-4">
                  <input
                    id="classCheck"
                    type="checkbox"
                    className="checkbox-stats"
                    onChange={handleClassSelect}
                    defaultChecked
                    disabled={imageResult}
                  ></input>
                  <p className="mx-4">CLASS: </p>
                  <select
                    id="classInput"
                    className="bg-transparent resize-none h-6  bg-slate-200 text-white flex-grow"
                    onChange={handleClassSelect}
                    disabled={imageResult}
                  >
                    <option value=''>

                      {pdfData.class ? pdfData.class : "Select a Class"}
                    </option>
                    {CONSTANTS.characterClass.map((characterClass) => (
                      <option key={characterClass}>{characterClass}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center mx-[48px] mt-2 mb-4">
                  <input
                    type="checkbox"
                    className="checkbox-stats"
                    id="armorCheck"
                    onChange={handleArmorSelect}
                    defaultChecked
                    disabled={imageResult}
                  ></input>
                  <p className="mx-4">ARMOR: </p>
                  <textarea
                    id="armorInput"
                    placeholder="eg. studded leather armor"
                    className="bg-transparent resize-none h-6 overflow-hidden"
                    onChange={handleArmorSelect}
                    defaultValue={pdfData.armorWorn ? pdfData.armorWorn : ""}
                    disabled={imageResult}
                  ></textarea>
                </div>
                <div className="flex items-center mx-[48px] mt-2 mb-4">
                  <input
                    id="backgroundCheck"
                    type="checkbox"
                    className="checkbox-stats"
                    onChange={handleBackgroundSelect}
                    defaultChecked
                    disabled={imageResult}
                  ></input>
                  <p className="mx-4">BACKGROUND: </p>
                  <select
                    id="backgroundInput"
                    placeholder="Background"
                    className="bg-transparent resize-none h-6 bg-slate-200 text-white  flex-grow"
                    onChange={handleBackgroundSelect}
                    disabled={imageResult}
                  >
                    <option value="">
                      {pdfData.background
                        ? pdfData.background
                        : "Background..."}
                    </option>
                    {CONSTANTS.characterBackground.map(
                      (characterBackground) => (
                        <option key={characterBackground}>
                          {characterBackground}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="flex items-center mx-[48px] mt-2 mb-4 overflow-hidden">
                  <input
                    id="alignmentCheck"
                    type="checkbox"
                    className="checkbox-stats"
                    onChange={handleAlignmentSelect}
                    defaultChecked
                    disabled={imageResult}
                  ></input>
                  <p className="mx-4">ALIGNMENT: </p>
                  <select
                    id="alignmentInput"
                    placeholder="Neutral Good"
                    className="bg-transparent resize-none h-6 bg-slate-200 text-white flex-grow"
                    onChange={handleAlignmentSelect}
                    disabled={imageResult}
                  >
                    <option value=''>

                      {pdfData.alignment ? pdfData.alignment : "Alignment..."}
                    </option>
                    {CONSTANTS.characterAlignment.map((characterAlignment) => (
                      <option key={characterAlignment}>
                        {characterAlignment}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center ml-[48px] mt-2 mb-4">
                  <input
                    id="featureCheck"
                    type="checkbox"
                    className="checkbox-stats"
                    onChange={handleFeatureSelect}
                    disabled={imageResult}
                  ></input>
                  <p className="mx-4">FEATURE: </p>
                  <textarea
                    id="featureInput"
                    placeholder="Feature"
                    className="bg-transparent resize-none h-6 overflow-hidden"
                    onChange={handleFeatureSelect}
                    defaultValue={pdfData.feature ? pdfData.feature : ""}
                    disabled={imageResult}
                  ></textarea>
                </div>

                <div className="flex items-center mx-[48px] mt-2 mb-4">
                  <input
                    id="colorCheck"
                    type="checkbox"
                    className="checkbox-stats"
                    onChange={handleColorSelect}
                    defaultChecked
                    disabled={imageResult}
                  ></input>
                  <p className="mx-4">COLOR: </p>
                  <select
                    id="colorInput"
                    placeholder=""
                    className="bg-transparent resize-none h-6 bg-slate-200 text-white flex-grow"
                    onChange={handleColorSelect}
                    disabled={imageResult}
                  >
                    <option value=''>

                      {pdfData.color ? pdfData.color : "Color..."}
                    </option>
                    {CONSTANTS.colors.map((colors) => (
                      <option key={colors}>{colors}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center mx-[48px] mt-2 mb-4">
                  <input
                    id="genderCheck"
                    type="checkbox"
                    className="checkbox-stats"
                    onChange={handleGenderSelect}
                    disabled={imageResult}
                  ></input>
                  <p className="mx-4">GENDER : </p>
                  <textarea
                    id="genderInput"
                    placeholder="Gender"
                    className="bg-transparent resize-none h-6"
                    onChange={handleGenderSelect}
                    defaultValue={pdfData.gender ? pdfData.gender : ""}
                    disabled={imageResult}
                  ></textarea>
                </div>
              </div>
              <h4 className="text-center">EDIT THIS LATER IN ADVANCED</h4>
            </div>
            
            <Tooltip content={characterStatsTT}>
            </Tooltip>
          </div>
        </>
      ) : null}
    </>
  );
};

export default CharacterStats;
