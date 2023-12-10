import React, { useState, useEffect } from "react";
import Explorer from "../components/Explorer";
import { Countdown } from "../components/Countdown";
import {
  useAccount,
  useContractRead,
  useContractReads,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";
import NftCard from "../components/NftCard";
import GenerateButton from "../components/GenerateButton";

import { getServerSideProperties } from "../utils/getServerSideProps";
import { getMostLikedSubmission } from "./api/getMostLikedSubmission";
import { getCOWSubmissions } from "./api/getCOWSubmissions";
import { addresses } from "../utils/addresses";
import { ceptorDiceABI, promptCollectionABI, timerABI } from "../utils/abis";
import { useEthersProvider } from "../utils/ethers";
import { submit } from "./api/submit";
import { COWsubmissionsMock, winningSubmissionMock } from "../utils/mock";
import { SubmitData } from "../utils/types";

// For the user to submit the timer  (of burned/used dice) has to be running,
// for presentation we burn the 5, which is 20 minutes.

export async function getServerSideProps() {
  return getServerSideProperties();
}

export default function WeeklyChallenge({
  ALCHEMY_GOERLI_API_KEY,
  ALCHEMY_SEPOLIA_API_KEY,
  ALCHEMY_POLYGON_ZKEVM_API_KEY,
  PUBLIC_IMAGE_URL,
}: {
  ALCHEMY_GOERLI_API_KEY: string;
  ALCHEMY_SEPOLIA_API_KEY: string;
  ALCHEMY_POLYGON_ZKEVM_API_KEY: string;
  PUBLIC_IMAGE_URL: string;
}) {
  const { chain, chains } = useNetwork();
  const provider = useEthersProvider({ chainId: chain?.id });
  const { address, isConnecting, isDisconnected } = useAccount();

  const [nftList, setNFTList] = useState<SubmitData[]>([]);
  const [deadline, setDeadline] = useState<number>();
  const [weeklyChallenge, setWeeklyChallenge] = useState("Weekly Challenge");
  const [isConnected, setIsConnected] = useState(false);
  const [winnerNFT, setWinnerNFT] = useState<SubmitData>();
  const [userPrompt, setUserPrompt] = useState("");

  // Generate Button States
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
  }); //stretch goal! Update these values based on character quiz

  console.log(addresses[chain?.network]?.ceptorDice);

  // TODO: move logic to burn dice to navbar
  // Config for burning Dice
  const { config: configBurnDice } = usePrepareContractWrite({
    address: addresses[chain?.network]?.ceptorDice,
    abi: ceptorDiceABI,
    functionName: "timerBurn",
    args: [address, 5, 1],
  });

  // // Hook for burning Dice
  const {
    isLoading: isLoadingDice,
    data: dataBurnDice,
    write: writeBurnDice,
  } = useContractWrite(configBurnDice);

  const burnDice = async () => {
    if (!address) {
      alert("connect your wallet");
      return;
    }
    writeBurnDice();
  };

  /**
   * ---------------------------------------------------------------------------------------
   * CHECK FOR THE CHALLENGE OF THE WEEK AND THE REMAINING TIME AND LAST WINNING SUBMISSION
   * ---------------------------------------------------------------------------------------
   */

  const {
    data: readData,
    isError: isErrorRead,
    isLoading: isLoadingRead,
  } = useContractReads({
    contracts: [
      {
        address: addresses["sepolia"]?.promptCollection as any,
        abi: promptCollectionABI as any,
        functionName: "getCurrentPrompt",
      },
      {
        address: addresses["sepolia"]?.promptCollection as any,
        abi: promptCollectionABI as any,
        functionName: "weekTimeStamp",
      },
    ],
  });

  /**
   * ---------------------------------------------------------------------------------------
   *  LAST WINNING SUBMISSION AND ALL CURRENT  SUBMISSIONS
   * ---------------------------------------------------------------------------------------
   */

  const getWinningSubmission = async () => {
    // TODO: replace mock data
    // const result = await getMostLikedSubmission();
    const result = [winningSubmissionMock];
    console.log(result);

    setWinnerNFT(result[0]);
  };

  const getAllSubmission = async () => {
    // TODO: replace mock data
    // const result = await getCOWSubmissions();
    const result = COWsubmissionsMock;
    console.log(result);
    setNFTList(result);
  };

  useEffect(() => {
    // get this weeks challenge
    // get this weeks deadline

    if (readData) {
      setWeeklyChallenge(readData[0]?.result as any);
      setDeadline(Number(readData[1]?.result));
      console.log(readData);
    }

    getWinningSubmission();
    getAllSubmission();
  }, [readData]);

  // // TODO: remove this temp variable once we get the deadline for powt from the smart contract
  // const oneWeekFromNow = new Date();
  // oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7); // Adds 7 days to the current date

  /**
   * -------------------------------------------------------------------------------
   * SEND SUBMISSIONS: User submissions can only be sent, when a discs is being  burned
   * so we need to check if dice timer is running
   * -------------------------------------------------------------------------------
   */

  // check if user has a dice burning or needs to buy one.
  const {
    data: dataTimer,
    isError,
    isLoading,
  } = useContractRead({
    // remove sepolia
    address: addresses[chain?.network || "sepolia"].timer,
    abi: timerABI,
    functionName: "checkTimer",
    args: [address],
  });

  console.log("User has game time", dataTimer);

  // Config for sending user submission
  const { config: configSendSubmission } = usePrepareContractWrite({
    address: addresses[chain?.network]?.promptCollection,
    abi: promptCollectionABI,
    functionName: "mint",
  });

  // Hook for sending user submission
  const { data: dataSendSubmission, write: writeSendSubmission } =
    useContractWrite(configSendSubmission);

  // TODO: create my submission using AI - component needs to be added in new branch
  const sendSubmission = async () => {
    // TODO: call mint from promptCollection submit() -return tokenID
    // TODO: send data to Mongo db with the tokenID
    if (!address) {
      alert("connect your wallet");
      return;
    }

    submit(winningSubmissionMock);
    writeSendSubmission();
  };

  return (
    <div className="bg-black flex flex-col items-center  min-h-screen py-5 space-y-10">
      <div className="flex flex-col justify-center items-center ">
        <h1 className="font-milonga text-4xl uppercase text-light-yellow mb-5">
          Challenge of the Week{" "}
        </h1>
        <h1 className="font-oswald text-2xl uppercase font-bold mb-2">
          powered by Chainlink VRF, Automation, & Functions
        </h1>
        <h1 className="font-oswald text-xl uppercase font-bold ">
          Are you an AI Prompt artist / wizard?
        </h1>
        <h1 className="font-oswald text-xl uppercase font-bold">
          Burn a die and mint your ChallengerNFT
        </h1>
        <div className="flex flex-col justify-center items-center mt-10">
          {winnerNFT && (
            <NftCard
              key={winnerNFT.tokenID}
              nft={winnerNFT}
              winner={true}
              onCardClick={() => console.log("nothing")}
              PUBLIC_IMAGE_URL={PUBLIC_IMAGE_URL}
            />
          )}
          <h1 className="font-oswald text-sm uppercase font-bold">
            Winner of last weeks challenge
          </h1>
        </div>

        <div className="flex flex-wrap justify-center items-center">
          <div className="mt-4 bg-light-pink mx-auto min-w-max p-4 px-4 rounded-xl shadow-lg">
            <h1 className="font-oswald text-xl uppercase text-light-yellow">
              This week’s challenge:
            </h1>
            <p className="text-2xl font-nothing-you-could-do">
              {weeklyChallenge}
            </p>
          </div>
          <div className="text-light-pink font-oswald m-5">
            {/* TODO: add real deadline from smart contract */}
            <Countdown deadline={deadline} />
          </div>
        </div>

        <div>
          <input
            className="rounded-lg p-2 border-4 border-light-pink"
            type="text"
            id="myInput"
            value={userPrompt}
            onChange={(event) => {
              setUserPrompt(event.target.value);
            }}
          />
        </div>
        {/* 
        {!error && !imageProcessing ? (
          <GenerateButton
            setConditionalCreate={setConditionalCreate}
            setImageProcessing={setImageProcessing}
            setError={setError}
            setImageResult={setImageResult}
            imageResult={imageResult}
            pdfData={pdfData}
            imageProcessing={imageProcessing}
            prompt={userPrompt}
          />
        ) : null} */}

        <div className="flex flex-row">
          <button
            className="button-xs text-black pt-5"
            onClick={() => sendSubmission()}
          >
            submit prompt
          </button>
          <button
            className="button-xs text-black pt-5"
            onClick={() => burnDice()}
          >
            burn
          </button>
        </div>
      </div>

      <Explorer
        ALCHEMY_GOERLI_API_KEY={ALCHEMY_GOERLI_API_KEY}
        ALCHEMY_SEPOLIA_API_KEY={ALCHEMY_SEPOLIA_API_KEY}
        ALCHEMY_POLYGON_ZKEVM_API_KEY={ALCHEMY_POLYGON_ZKEVM_API_KEY}
        PUBLIC_IMAGE_URL={PUBLIC_IMAGE_URL}
        nftList={nftList}
      />
    </div>
  );
}
