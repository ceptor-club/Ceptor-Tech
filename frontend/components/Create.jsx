
import React from "react";
import Link from 'next/link';
import { useEffect, useState, useContext } from "react";
import { createPrompt } from "../utils/promptGen";
import { CharacterBackstory } from "./CharacterModule/CharacterBackstory";
import { CreateImageGrid } from "./CreateImageGrid";
import PDFParser from "./PDFParser";
import Placeholder from "../public/images/CREATE/placeholder.png";
import SaveButton from "./Buttons/SaveButton";
import CopyButton from "./Buttons/CopyButton";
import CharacterStats from "./CharacterModule/CharacterStats";
import ToolTip from "./ToolTip";
import MintButton from "./Buttons/MintButton";
import GenerateButton from "./Buttons/GenerateButton";
import Image from "next/image";
import AdvancedButton from "./Buttons/AdvancedButton";
import OCRParser from "./OCRParser";
import SuccessModal from "./SuccessModal";


import {
  useAccount,
  useDisconnect,
  useContractReads,
  useContractRead,
} from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import { CONSTANTS } from "../utils/CONSTANTS";
import { LoadingTips } from "./LoadingTips";

import Tooltip from "./ToolTip";
import InfoIcon from "./InfoIcon";

const errorTT =
  "This error is likely due to our GPU being offline. However, if you believe there might be another reason you're seeing this error, please submit a support request ticket.";

const mintButtonTT =
  "Ready to mint? Connect the wallet you want to use, and then click here to create an ERC 721 NFT of this wizardry we've made together!";

const saveButtonTT =
  "Right click or long press not working? We've got your download right here.";

const resultsTT =
  "Our Conceptor© has generated two images. Hate them? Reroll. If you like one, select it to mint or download.";

const editPromptTT =
  "Are you brave? Curious? Willing to fill out a bug report? Advanced settings are recommended for experienced users of AI art generation tools. ";

const promptBoxTT =
  "This is the prompt our Creator AI Artist used to draw your character based on your character sheet and your stats.";


import { CharacterContext } from './CharacterModule/CharacterContext';

// wallet connect
// buy dice/ display dice + timer
// burn dice for time
// show stats/create character stuff
// generate image
// select image
// mint image

//time dongxi:   const timeLeft = userTimer - Math.floor(Date.now() / 1000)

export const Create = () => {
  const { characterData } = useContext(CharacterContext)
  console.log(characterData)
  const [prompt, setPrompt] = useState(null); //url
  const [imageProcessing, setImageProcessing] = useState(false); //processing state ie. loading...
  const [error, setError] = useState(null); //error msg
  const [imageResult, setImageResult] = useState(null); //url
  const [selectedImage, setSelectedImage] = useState(null); //image chosen by user
  const [conditionalCreate, setConditionalCreate] = useState("");
  const [isMinting, setIsMinting] = useState(false); //minting nft state ie. loading...
  const [userDice, setUserDice] = useState([0, 0, 0, 0, 0, 0]); //dice balance
  const [pdfData, setPdfData] = useState({

    race: "",
    class: "",
    armorWorn: "",
    background: "",
    alignment: "",
    feature: "",
    gender: "",
    color: "",
    weapon: "",
  });//stretch goal! Update these values based on character quiz

  const [advanced, setAdvanced] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [successTxnHash, setSuccessTxnHash] = useState("");
  const [storedNFTImage, setStoredNFTImage] = useState("");

  const { address, isConnected } = useAccount();
  const { open, isOpen, close } = useWeb3Modal();
  // const { disconnect } = useDisconnect();

  /*   const { data: userTimer } = useContractRead({
    address: CONSTANTS.ceptorAddress,
    abi: CONSTANTS.ceptorABI,
    functionName: 'userTimers',
    args: [address],
  });

  const diceContract = {
    address: CONSTANTS.diceAddress,
    abi: CONSTANTS.diceABI,
  };

  const {
    data: diceBalance,
    isError,
    isLoading,
  } = useContractReads({
    contracts: [
      {
        ...diceContract,
        functionName: 'balanceOf',
        args: [address, 0],
      },
      {
        ...diceContract,
        functionName: 'balanceOf',
        args: [address, 1],
      },
      {
        ...diceContract,
        functionName: 'balanceOf',
        args: [address, 2],
      },
      {
        ...diceContract,
        functionName: 'balanceOf',
        args: [address, 3],
      },
      {
        ...diceContract,
        functionName: 'balanceOf',
        args: [address, 4],
      },
      {
        ...diceContract,
        functionName: 'balanceOf',
        args: [address, 5],
      },
    ],
    // allowFailure: true,
  }); */

  //states: no data, pdf uploaded, images generated, nft minted

  /*   useEffect(() => {
    if (pdfData) {
      console.log("pdfData: ", pdfData);
      //create text prompt using pdfData and other data
      const prompt = createPrompt(pdfData);
      console.log("prompt: ", prompt);
      setPrompt(prompt);
      setError(null);
    }
  }, [pdfData]); */

  /*   useEffect(() => {
    if (prompt) {
      console.log("prompt update: ", prompt);
      // setPrompt(prompt);
      setError(null);
    }
  }, [prompt]); */

  /*   useEffect(() => {
    if (isConnected && diceBalance) {
      console.log('wallet is connected', address);
      //call the dice contract

      console.log('userTimer: ', parseInt(userTimer));

      console.log('diceBalance: ', diceBalance);

      diceBalance.map((balance, i) => {
        console.log('balance: ', i, parseInt(balance));
      });
    }
  }, [isConnected, diceBalance, address, userTimer]); */

  const retry = () => {
    setConditionalCreate("");
    setError(null);
  };

  const advancedSection = () => {
    setAdvanced(!advanced);
    /*     const manualInput = document.getElementById('manualInput');
    manualInput.scrollIntoView({ behavior: 'smooth' }); */
  };

  return (
    <>
      {error ? (
        <>
          <div
            className="relative text-2xl w-full h-[400px] md:w-[500px] cursor-pointer"
            onClick={retry}
          >
            <div className="absolute top-0 w-full h-[300px] bg-black opacity-70 p-4 rounded-xl mt-6"></div>
            <div className="absolute top-0 flex flex-col align-center items-center justify-center h-[300px] p-4 mt-6 w-full">
              <p className="opacity-100 cursor-pointer text-center w-full">
                theres an error
              </p>
              <Tooltip content={errorTT}>
                <div className='absolute right-10 bottom-1/2'>
                  <InfoIcon />
                </div>
              </Tooltip>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex xl:flex-nowrap w-screen gap-2 justify-center items-center">
            <div className="flex flex-col w-full justify-center items-center">
              {imageProcessing ? (
                <>
                  <LoadingTips />
                </>
              ) : !imageProcessing ? (
                <>
                  {/* <div className="relative text-center text-2xl w-full h-[350px] md:w-[500px]">
                    <div className="absolute top-0 w-full h-[300px] bg-black opacity-70 p-4 rounded-xl mt-6"></div>
                    <div className="absolute top-0 flex flex-col align-center items-center justify-between h-[300px] p-4 mt-6">
                      <p className="opacity-100 text-red-300">
                        Since we are in the early prototyping stage, our GPU is
                        currently down while we continue working.
                      </p>
                      <br></br>
                      <a
                        href="https://discord.gg/kPC8GMK5"
                        className="bg-gray-300 rounded-xl text-black hover:bg-gray-100 p-4 cursor-pointer"
                      >
                        Join our Discord and clamor for more!{" "}
                        <span className="">https://discord.gg/kPC8GMK5</span>
                      </a>
                    </div>
                  </div> */}
                  {!imageResult && (
                    <div className="w-full max-w-[450px]">
                      <OCRParser
                        pdfData={pdfData}
                        setError={setError}
                        setPdfData={setPdfData}
                        imageProcessing={imageProcessing}
                        setImageProcessing={setImageProcessing}
                      />
                    </div>
                  )}
                  <CharacterStats
                    pdfData={pdfData}
                    prompt={prompt}
                    setPrompt={setPrompt}
                    setError={setError}
                    setPdfData={setPdfData}
                    imageResult={imageResult}
                    advanced={advanced}
                  />
                </>
              ) : null}

              {imageResult && !imageProcessing ? (
                <>
                  <div className='flex flex-col items-center bg-black mt-8'>
                    <Tooltip content={resultsTT}>
                      <div className='ml-auto'>
                        <InfoIcon />
                      </div>
                    </Tooltip>
                    <h3 id='results' className='text-4xl mb-4'>
                      RESULTS
                    </h3>
                    <p>Select an image to save or mint</p>
                    {/* images grid */}
                    <div className="m-4 mb-6">
                      {/* a grid of 9 images */}
                      <CreateImageGrid
                        imageResult={imageResult}
                        imageProcessing={imageProcessing}
                        error={error}
                        pdfData={pdfData}
                        setSelectedImage={setSelectedImage}
                        storedNFTImage={storedNFTImage}
                      />
                    </div>
                  </div>
                </>
              ) : null}

              {imageResult && !imageProcessing ? (
                <div className="flex gap-4 justify-center items-center">
                  <MintButton
                    selectedImage={selectedImage}
                    pdfData={pdfData}
                    setIsMinting={setIsMinting}
                    isMinting={isMinting}
                    prompt={prompt}
                    setModalOpen={setModalOpen}
                    setModalMessage={setModalMessage}
                    setSuccessTxnHash={setSuccessTxnHash}
                    setStoredNFTImage={setStoredNFTImage}
                    storedNFTImage={storedNFTImage}
                  />
                  <div className='relative'>
                    <Tooltip content={mintButtonTT}>
                      <div className='absolute right-10 bottom-0'>
                        <InfoIcon />
                      </div>
                    </Tooltip>
                  </div>
                  <SaveButton
                    selectedImage={selectedImage}
                    setModalOpen={setModalOpen}
                    setModalMessage={setModalMessage}
                  />
                  <div className='relative'>
                    <Tooltip content={saveButtonTT}>
                      <div className='absolute right-10 bottom-0'>
                        <InfoIcon />
                      </div>
                    </Tooltip>
                  </div>
                  {/* <CopyButton selectedImage={currentSelection} /> */}
                </div>
              ) : null}

              {!error && !imageProcessing ? (
                <GenerateButton
                  setConditionalCreate={setConditionalCreate}
                  setImageProcessing={setImageProcessing}
                  setError={setError}
                  setImageResult={setImageResult}
                  imageResult={imageResult}
                  pdfData={pdfData}
                  isMinting={isMinting}
                  imageProcessing={imageProcessing}
                  prompt={prompt}
                />
              ) : null}

              {imageResult ? (
                <>
                  <div
                    className="flex cursor-pointer"
                    onClick={advancedSection}
                  >
                    <p className="text-2xl mr-4">ADVANCED</p>
                    <span
                      className="arrow-down"
                      onClick={advancedSection}
                    ></span>
                  </div>
                </>
              ) : null}

              {advanced && !imageProcessing ? (
                <>
                  <div className='w-full h-[150px] md:w-[400px]'>
                    <h3 className='mt-8 text-2xl'>PROMPT SMITH</h3>
                    <h3>Edit Your Prompt Manually</h3>
                    <Tooltip content={editPromptTT}>
                      <div className='float-right'>
                        <InfoIcon />
                      </div>
                    </Tooltip>
                  </div>
                  <div className='bg-black text-left text-sm p-2'>
                    <h3 className='mb-4'>
                      Your Prompt Was Recovered from the Fires of the Forge!
                    </h3>
                    <textarea
                      onChange={(e) => setPrompt(e.target.value)}
                      className='w-full h-[150px] bg-transparent resize-none'
                      value={prompt ? prompt : ""}
                      id='manualInput'
                    ></textarea>
                    <Tooltip content={promptBoxTT}>
                      <div className='float-right'>
                        <InfoIcon />
                      </div>
                    </Tooltip>
                  </div>
                </>
              ) : imageResult ? null : null}

              {imageProcessing ? null : (
                <>
                  <div className="w-full flex flex-col items-center">
                    <a
                      href="https://ceptor.club/feedback/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xl mt-12 mb-4 font-bold text-white underline hover:text-[#e137b1]"
                    >
                      FEEBACK / BUG REPORT
                    </a>
                    <a
                      href="https://discord.gg/kPC8GMK5"
                      className="bg-black bg-opacity-50 rounded-sm text-white hover:text-[#e137b1] cursor-pointer w-full text-center py-2"
                    >
                      Join our Discord and clamor for more!
                      <p className="">https://discord.gg/kPC8GMK5</p>
                    </a>
                  </div>
                  <Link href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' className="text-black hover:text-white w-4">
                      {"What's this?"}
                  </Link>
                </>
              )}
            </div>
          </div>
          <SuccessModal
            selectedImage={selectedImage}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            modalMessage={modalMessage}
            successTxnHash={successTxnHash}
            storedNFTImage={storedNFTImage}
          />
        </>
      )}
    </>
  );
};
