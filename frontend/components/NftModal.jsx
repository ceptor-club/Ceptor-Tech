import React from "react";
import Image from "next/image";

const NftModal = ({ modalOpen, setModalOpen, nft }) => {
  const closeModal = (e) => {
    const search = e.target.className;
    if (search.includes("modal")) {
      setModalOpen(false);
    }
  };

  return (
    <>
      {modalOpen && nft && (
        <div
          className="modal fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-80 flex items-center justify-center text-black"
          onClick={closeModal}
        >
          <div className="scrollableDiv p-6 pt-2 bg-blue-900 text-center rounded-lg flex flex-col items-center max-w-md mx-auto">
            {" "}
            {/* Changed max-w-lg to max-w-md */}
            <p className="w-full text-right text-4xl">
              <b className="modal cursor-pointer" onClick={closeModal}>
                &times;
              </b>
            </p>
            <div className="w-full flex flex-col items-center">
              <h2 className="text-2xl">{nft.rawMetadata.name}</h2>
              <div className="flex justify-center">
                <Image
                  src={nft.rawMetadata.image.replace(
                    "ipfs://",
                    "https://ipfs.io/ipfs/"
                  )}
                  alt={nft.rawMetadata.name}
                  width={350}
                  height={350}
                />{" "}
                {/* Reduced image size */}
              </div>
              <p>{nft.rawMetadata.description}</p>
              <ul className="w-full">
                {nft.rawMetadata.attributes
                  .filter((attr) => attr.trait_type !== "Prompt")
                  .map((attr, index) => (
                    <li
                      key={index}
                      className="flex justify-between border-b border-black py-2"
                    >
                      <span className="font-bold">
                        {attr.trait_type ? attr.trait_type : "Creator"}:
                      </span>
                      <span>{attr.value}</span>
                    </li>
                  ))}
                {nft.rawMetadata.attributes
                  .filter((attr) => attr.trait_type === "Prompt")
                  .map((attr, index) => (
                    <li key={index}>
                      <span className="font-bold block">
                        {attr.trait_type ? attr.trait_type : "Creator"}:
                      </span>
                      <span>{attr.value}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NftModal;
