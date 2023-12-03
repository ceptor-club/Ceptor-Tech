import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Alchemy, Network } from "alchemy-sdk";
import NftCard from "../components/NftCard";
import Link from "next/link";

export async function getServerSideProps() {
  const ALCHEMY_GOERLI_API_KEY = process.env.ALCHEMY_GOERLI_API_KEY;
  const ALCHEMY_SEPOLIA_API_KEY = process.env.ALCHEMY_SEPOLIA_API_KEY;

  return {
    props: {
      ALCHEMY_GOERLI_API_KEY,
      ALCHEMY_SEPOLIA_API_KEY,
    },
  };
}

const PotW = ({ ALCHEMY_GOERLI_API_KEY, ALCHEMY_SEPOLIA_API_KEY }) => {
  const [alchemy, setAlchemy] = useState(null);
  const [latestBlock, setLatestBlock] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;
  const [enlargedCard, setEnlargedCard] = useState(null);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const [promptOfTheMoment, setPromptOfTheMoment] = useState(
    "Your initial prompt"
  );
  const [account, setAccount] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log(ALCHEMY_GOERLI_API_KEY, ALCHEMY_SEPOLIA_API_KEY);
    const initializeAlchemy = async () => {
      if (ALCHEMY_GOERLI_API_KEY) {
        const goerliSettings = {
          apiKey: ALCHEMY_GOERLI_API_KEY,
          network: Network.ETH_GOERLI,
        };
        const goerliAlchemyInstance = new Alchemy(goerliSettings);
        setAlchemy((prev) => ({ ...prev, goerli: goerliAlchemyInstance }));
      }

      if (ALCHEMY_SEPOLIA_API_KEY) {
        const sepoliaSettings = {
          apiKey: ALCHEMY_SEPOLIA_API_KEY,
          network: Network.ETH_SEPOLIA,
        };
        const sepoliaAlchemyInstance = new Alchemy(sepoliaSettings);
        setAlchemy((prev) => ({ ...prev, sepolia: sepoliaAlchemyInstance }));
        fetchCurrentPrompt(sepoliaAlchemyInstance);
      }
    };
    const fetchCurrentPrompt = async (alchemy) => {
      // Function signature for the `getCurrentPrompt()` function
      let functionSignature = "getCurrentPrompt()";
      let data = ethers.utils.id(functionSignature);

      let transaction = {
        to: "0x8dFec628e42Cc35665C621ad04e03Dc627d15432",
        data: data,
      };

      let response = await alchemy.core.call(transaction); // Assuming you want to use the goerli network

      // Decoding the response
      let result = ethers.utils.defaultAbiCoder.decode(["string"], response);
      setPromptOfTheMoment(result);
    };
    initializeAlchemy();
  }, [ALCHEMY_GOERLI_API_KEY, ALCHEMY_SEPOLIA_API_KEY]);

  useEffect(() => {
    console.log("nfts state updated:", nfts);
  }, [nfts]);

  const updateNfts = (newNfts) => {
    console.log("Type of newNfts:", typeof newNfts);
    if (Array.isArray(newNfts.nfts)) {
      console.log("newNfts is an array:", newNfts);
      setNfts(newNfts.nfts);
    } else {
      console.log("newNfts is not an array:", newNfts);
    }
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const getNfts = async () => {
    const exploreCeptor = [
      {
        network: "goerli",
        address: "0x4379044facb5f0879de15e70b45afd495a197674",
      },
      {
        network: "goerli",
        address: "0x60fAF5FAe9F2EA10504d505B50104E783bf505B1",
      },
      {
        network: "sepolia", //Sep Ceptors
        address: "0x4dBe3E96d429b9fE5F2Bb89728E39138aC4F817A",
      },
      {
        network: "sepolia", //Sep Dice
        address: "0xEd1dbc1f6E5e9f4066AAa341c87e157Ad40328A9",
      },
    ];

    let allNfts = [];

    for (const { network, address } of exploreCeptor) {
      // Get the Alchemy instance for the current network
      const currentAlchemy = alchemy[network];

      // Call the method to fetch metadata for the current network's address
      const response = await currentAlchemy.nft.getNftsForContract(address);

      // // For each NFT, get the owner's address and attach it to the NFT's metadata
      for (const nft of response.nfts) {
        await sleep(100);
        const owner = await currentAlchemy.nft.getOwnersForNft(
          address,
          nft.tokenId
        );
        console.log(`Retrieving NFT for owner: ${owner.owners[0]}`);
        nft.owner = owner.owners[0]; // Attach the owner's address to the NFT
      }
      // Add the fetched NFTs to the allNfts array
      allNfts = allNfts.concat(response.nfts);
    }

    // Log the response to the console and update the NFTs state
    console.log(allNfts);
    updateNfts({ nfts: allNfts });
  };

  const handleCardClick = (cardId) => {
    if (enlargedCard === cardId) {
      setEnlargedCard(null);
    } else {
      setEnlargedCard(cardId);
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      // Check if MetaMask is installed
      try {
        // Request account access
        const accounts = await window.ethereum.request({
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
        <h1 className="text-4xl font-bold">Prompt Challenge!</h1>
        <div className="mt-4 bg-blue-200 mx-auto min-w-max p-4 px-4 rounded-xl shadow-lg">
          <p className="text-2xl">{promptOfTheMoment}</p>
        </div>
      </div>
      <Link href="/">Return</Link>
      <button onClick={getNfts}>Get NFTs</button>
      <div className="flex flex-wrap bg-transparent justify-center py-5">
        {Array.isArray(nfts) &&
          nfts.slice(startIndex, endIndex).map((nft) => {
            return (
              <NftCard
                key={nft.tokenId}
                nft={nft}
                isEnlarged={enlargedCard === nft.tokenId}
                id={account}
                onCardClick={handleCardClick}
              />
            );
          })}
        <div className="flex justify-center space-x-4 my-5">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage * cardsPerPage >= nfts.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PotW;
