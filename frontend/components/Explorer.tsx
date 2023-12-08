import React, { useState, useEffect, useCallback } from "react";
import NftCard from "./NftCard";
import NftModal from "./NftModal";
import { Alchemy, Network, Nft } from "alchemy-sdk";

const Explorer = ({
  ALCHEMY_GOERLI_API_KEY,
  ALCHEMY_SEPOLIA_API_KEY,
  ALCHEMY_POLYGON_ZKEVM_API_KEY,
  nftList,
}: {
  ALCHEMY_GOERLI_API_KEY: string;
  ALCHEMY_SEPOLIA_API_KEY: string;
  ALCHEMY_POLYGON_ZKEVM_API_KEY: string;
  nftList: Nft[];
}) => {
  const [alchemy, setAlchemy] = useState(null);
  const [nfts, setNfts] = useState([]);
  const cardsPerPage = 20;
  const [displayedCards, setDisplayedCards] = useState(cardsPerPage);
  const [modalOpen, setModalOpen] = useState(true);
  const [selectedNft, setSelectedNft] = useState(null);

  useEffect(() => {
    const initializeAlchemy = async () => {
      let newAlchemy: any = {};

      if (ALCHEMY_GOERLI_API_KEY) {
        const goerliSettings = {
          apiKey: ALCHEMY_GOERLI_API_KEY,
          network: Network.ETH_GOERLI,
        };
        newAlchemy.goerli = new Alchemy(goerliSettings);
      }

      if (ALCHEMY_SEPOLIA_API_KEY) {
        const sepoliaSettings = {
          apiKey: ALCHEMY_SEPOLIA_API_KEY,
          network: Network.ETH_SEPOLIA,
        };
        newAlchemy.sepolia = new Alchemy(sepoliaSettings);
      }

      if (ALCHEMY_POLYGON_ZKEVM_API_KEY) {
        const polygonZKEVMSettings = {
          apiKey: ALCHEMY_POLYGON_ZKEVM_API_KEY,
          network: Network.POLYGONZKEVM_TESTNET,
        };
        newAlchemy.polygonZKEVM = new Alchemy(polygonZKEVMSettings);
      }

      // Sets alchemy state only after both network
      // instances have been created.
      setAlchemy(newAlchemy);
    };
    initializeAlchemy();
  }, [
    ALCHEMY_GOERLI_API_KEY,
    ALCHEMY_SEPOLIA_API_KEY,
    ALCHEMY_POLYGON_ZKEVM_API_KEY,
  ]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      setDisplayedCards((prev) => prev + cardsPerPage);
    }
  };

  const updateNfts = (newNfts) => {
    setNfts(newNfts);
  };

  const getNfts = useCallback(async () => {
    if (!alchemy) {
      return;
    }

    // either nftList is input or standard collection is queried
    if (nftList?.length > 0) {
      updateNfts(nftList);
      return;
    }

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

    const invalidTokenIds = [4, 5, 8, 18]; // Token IDs in targetAddress with no image
    // Diffuse Contract on Goerli
    const targetAddress = "0x4379044facb5f0879de15e70b45afd495a197674";

    let allNfts = [];

    for (const { network, address } of exploreCeptor) {
      const currentAlchemy = alchemy[network];

      const response = await currentAlchemy?.nft.getNftsForContract(address);

      let nfts = response.nfts;

      // Filter is only for the targetAddress
      if (address === targetAddress) {
        nfts = nfts.filter(
          (nft) => !invalidTokenIds.includes(parseInt(nft.tokenId))
        );
      }

      allNfts = allNfts.concat(nfts);
    }

    updateNfts(allNfts);
  }, [alchemy, nftList]);

  useEffect(() => {
    getNfts();
  }, [getNfts]);

  const handleCardClick = (nft) => {
    setSelectedNft(nft);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNft(null);
    setModalOpen(false);
  };

  return (
    <div className="bg-light-grey space-y-2 flex flex-wrap justify-center p-12 ">
      <NftModal
        modalOpen={modalOpen}
        setModalOpen={closeModal}
        nft={selectedNft}
      />
      {Array.isArray(nfts) &&
        nfts.slice(0, displayedCards).map((nft) => {
          return (
            <NftCard
              key={nft.tokenId}
              nft={nft}
              winner={false}
              onCardClick={() => handleCardClick(nft)}
            />
          );
        })}
    </div>
  );
};

export default Explorer;
