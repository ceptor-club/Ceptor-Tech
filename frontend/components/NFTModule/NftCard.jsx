import React from "react";
import Image from "next/image";

const NftCard = ({ nft, onCardClick }) => {
  const { rawMetadata } = nft;

  const handleClick = () => {
    onCardClick(nft);
  };

  const DefaultView = () => (
    <div>
      <h3 className="text-lg font-bold mb-2">{rawMetadata.name}</h3>
      {/* <p>Token ID: {nft.tokenId}</p>
      <p>LV: {rawMetadata.attributes.find(attr => attr.trait_type === "Level").value}</p> */}
      <Image
        src={rawMetadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
        alt={rawMetadata.name}
        width={250}
        height={250}
        className="w-full h-auto mb-2 rounded-md"
      />
    </div>
  );

  return (
    rawMetadata.image && (
      <div 
        onClick={handleClick}
        className={`nft-card p-4 m-4 w-72 bg-blue-900 text-black rounded-md shadow-md transition-transform ease-in-out duration-300`}
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