import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Alchemy, Network, Nft } from "alchemy-sdk";
import Explorer from "../components/Explorer";
import Link from "next/link";
import { Countdown } from "../components/Countdown";
import { sepolia, useNetwork } from "wagmi";
import NftCard from "../components/NftCard";

export async function getServerSideProps() {
  const ALCHEMY_GOERLI_API_KEY = process.env.ALCHEMY_GOERLI_API_KEY;
  const ALCHEMY_SEPOLIA_API_KEY = process.env.ALCHEMY_SEPOLIA_API_KEY;
  const ALCHEMY_POLYGON_ZKEVM_API_KEY =
    process.env.ALCHEMY_POLYGON_ZKEVM_API_KEY;

  return {
    props: {
      ALCHEMY_GOERLI_API_KEY,
      ALCHEMY_SEPOLIA_API_KEY,
      ALCHEMY_POLYGON_ZKEVM_API_KEY,
    },
  };
}

export default function PotW({
  ALCHEMY_GOERLI_API_KEY,
  ALCHEMY_SEPOLIA_API_KEY,
  ALCHEMY_POLYGON_ZKEVM_API_KEY,
}) {
  const { chain, chains } = useNetwork();
  console.log(chain);

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

  // TODO: get NFTs of the current week
  // TODO: get winning NFT of last week

  useEffect(() => {
    console.log("nfts state updated:", nftList);
  }, [nftList]);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    const alchemy = new Alchemy({
      apiKey: ALCHEMY_SEPOLIA_API_KEY,
      network: Network.ETH_SEPOLIA,
    });
    console.log(alchemy);

    const getNFTofTheWeek = async () => {
      const response = await alchemy.nft.getNftsForContract(
        "0x4dBe3E96d429b9fE5F2Bb89728E39138aC4F817A"
      );

      setWinnerNFT(response.nfts[1]);
    };
    getNFTofTheWeek();
  }, []);

  const connectWallet = async () => {
    if ((window as any).ethereum) {
      // Check if MetaMask is installed
      try {
        // Request account access
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setIsConnected(true);
        console.log(accounts[0]);
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      console.error(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-5">
      <div className="w-full top-0 right-0 p-5 text-right">
        <button onClick={connectWallet}>
          {isConnected ? "Connected" : "Connect Wallet"}
        </button>
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-5">
          Prompt of the Week Challenge!
        </h1>
        <h3 className=" font-bold">Champion of the Week:</h3>
        <div>
          {winnerNFT && (
            <NftCard
              key={winnerNFT.tokenId}
              nft={winnerNFT}
              onCardClick={() => console.log("nothing")}
            />
          )}
        </div>
        <div className="mt-4 bg-blue-200 mx-auto min-w-max p-4 px-4 rounded-xl shadow-lg">
          <p className="text-2xl">{promptOfTheMoment}</p>
        </div>
        <div>
          {/* TODO: add real deadline from smart contract */}
          <Countdown deadline={oneWeekFromNow} />
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
