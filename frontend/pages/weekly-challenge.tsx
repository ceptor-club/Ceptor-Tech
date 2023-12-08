import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Alchemy, Network, Nft } from "alchemy-sdk";
import Explorer from "../components/Explorer";
import Link from "next/link";
import { Countdown } from "../components/Countdown";
import { sepolia, useNetwork } from "wagmi";
import NftCard from "../components/NftCard";
import { getServerSideProperties } from "../utils/getServerSideProps";

export async function getServerSideProps() {
  return getServerSideProperties();
}

export default function PotW({
  ALCHEMY_GOERLI_API_KEY,
  ALCHEMY_SEPOLIA_API_KEY,
  ALCHEMY_POLYGON_ZKEVM_API_KEY,
}: {
  ALCHEMY_GOERLI_API_KEY: string;
  ALCHEMY_SEPOLIA_API_KEY: string;
  ALCHEMY_POLYGON_ZKEVM_API_KEY: string;
}) {
  // const [alchemy, setAlchemy] = useState<Alchemy>();
  const [latestBlock, setLatestBlock] = useState(null);
  const [nftList, setNFTList] = useState([]);
  const [deadline, setDeadline] = useState<Date>();
  const [promptOfTheMoment, setPromptOfTheMoment] = useState(
    "Your initial prompt"
  );
  const [account, setAccount] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [winnerNFT, setWinnerNFT] = useState<Nft>();

  // TODO: remove this temp variable once we get the deadline for powt from the smart contract
  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7); // Adds 7 days to the current date

  useEffect(() => {
    console.log("nfts state updated:", nftList);
  }, [nftList]);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    // TODO: get winning NFT of last week
    const alchemy = new Alchemy({
      apiKey: ALCHEMY_SEPOLIA_API_KEY,
      network: Network.ETH_SEPOLIA,
    });

    const getNFTofTheWeek = async () => {
      const response = await alchemy.nft.getNftsForContract(
        "0x4dBe3E96d429b9fE5F2Bb89728E39138aC4F817A"
      );

      setWinnerNFT(response.nfts[1]);
    };
    getNFTofTheWeek();
  }, []);

  return (
    <div className="bg-light-grey flex flex-col items-center  min-h-screen py-5 space-y-10">
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
              key={winnerNFT.tokenId}
              nft={winnerNFT}
              winner={true}
              onCardClick={() => console.log("nothing")}
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
              {promptOfTheMoment}
            </p>
          </div>
          <div className="text-light-pink font-oswald m-5">
            {/* TODO: add real deadline from smart contract */}
            <Countdown deadline={oneWeekFromNow} />
          </div>
        </div>
      </div>

      <Explorer
        ALCHEMY_GOERLI_API_KEY={ALCHEMY_GOERLI_API_KEY}
        ALCHEMY_SEPOLIA_API_KEY={ALCHEMY_SEPOLIA_API_KEY}
        ALCHEMY_POLYGON_ZKEVM_API_KEY={ALCHEMY_POLYGON_ZKEVM_API_KEY}
        nftList={[]}
      />
    </div>
  );
}
