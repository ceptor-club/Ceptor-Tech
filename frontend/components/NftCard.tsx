import React from "react";
import Image from "next/image";

const NftCard = ({ nft, onCardClick, winner }) => {
  const { rawMetadata } = nft;

  const handleClick = () => {
    onCardClick(nft);
  };

  const like = () => {};

  const DefaultView = () => (
    <div className="flex flex-col justify-center items-center mt-10">
      {/* <h3 className="text-lg font-bold mb-2">{rawMetadata.name}</h3> */}
      {/* <p>Token ID: {nft.tokenId}</p>
      <p>LV: {rawMetadata.attributes.find(attr => attr.trait_type === "Level").value}</p> */}
      <Image
        src={rawMetadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
        alt={rawMetadata.name}
        width={250}
        height={250}
        className="rounded-md w-40 h-40 mt-2"
        onClick={handleClick}
      />
      <div className="flex flex-row justify-start items-start p-3">
        {winner || (
          <button onClick={() => like()}>
            <span className="material-symbols-outlined pr-2 ">favorite</span>
          </button>
        )}
        <p className="text-white">3</p>
      </div>
    </div>
  );

  return (
    rawMetadata.image && (
      <div
        className={`nft-card text-black rounded-md  transition-transform ease-in-out duration-30`}
      >
        {rawMetadata.name ? (
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
