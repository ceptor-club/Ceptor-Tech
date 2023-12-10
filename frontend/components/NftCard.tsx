import React, { useState } from "react";
import Image from "next/image";
import { voteForSubmission } from "../pages/api/voteForSubmission";
import { useAccount } from "wagmi";
import { VoteData } from "../utils/types";

const NftCard = ({ nft, onCardClick, winner, PUBLIC_URL }) => {
  const { address, isConnected } = useAccount();
  const [vote, setVote] = useState<VoteData>();

  const handleClick = () => {
    onCardClick(nft);
  };

  const like = async (tokenID: number) => {
    setVote({ wallet: address, tokenID: tokenID ? tokenID : 1 });
    voteForSubmission(vote);
    // TODO: just send vote to data base  - already in the NFTCard component
  };

  const DefaultView = () => (
    <div className="flex flex-col justify-center items-center mt-10">
      {/* <h3 className="text-lg font-bold mb-2">{rawMetadata.name}</h3> */}
      {/* <p>Token ID: {nft.tokenId}</p>
      <p>LV: {rawMetadata.attributes.find(attr => attr.trait_type === "Level").value}</p> */}
      {/* src={nft.image.replace("ipfs://", "https://ipfs.io/ipfs/")} */}
      <Image
        src={nft.image}
        alt={nft.addressOfCreator || ""}
        width={250}
        height={250}
        className="rounded-md "
        onClick={handleClick}
      />
      <div className="flex flex-row justify-start items-start p-3">
        {winner || (
          <button onClick={() => like(nft.tokenID)}>
            <span className="material-symbols-outlined pr-2 ">favorite</span>
          </button>
        )}
        <p className="text-white">{nft.likesAmount}</p>
      </div>
    </div>
  );

  return (
    nft.image && (
      <div
        className={`nft-card text-black rounded-md  transition-transform ease-in-out duration-30`}
      >
        {nft.addressOfCreator ? (
          <DefaultView />
        ) : (
          <div className="loading">
            <p>Loading NFT info...</p>
          </div>
        )}
      </div>
    )
  );
};

export default NftCard;
