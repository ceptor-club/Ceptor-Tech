import React from "react";
import Image from "next/image";
import { SubmitData } from "../utils/types";

const NftModal = ({
  modalOpen,
  setModalOpen,
  nft,
}: {
  modalOpen: boolean;
  setModalOpen: any;
  nft: SubmitData;
}) => {
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
          className="modal fixed top-0 left-0 w-full h-full z-50  bg-opacity-80 flex items-center justify-center text-white"
          onClick={closeModal}
        >
          <div className="font-oswald scrollableDiv p-6 pt-2 bg-black border text-center rounded-lg flex flex-col items-center max-w-md mx-auto">
            {" "}
            {/* Changed max-w-lg to max-w-md */}
            <p className="w-full text-right text-4xl">
              <b className="modal cursor-pointer" onClick={closeModal}>
                &times;
              </b>
            </p>
            <div className="w-full flex flex-col items-center space-y-3 ">
              <div className="flex justify-center rounded-lg">
                <Image
                  src={nft.image}
                  alt={nft.addressOfCreator || ""}
                  width={350}
                  height={350}
                />{" "}
                {/* Reduced image size */}
              </div>
              <p className="font-milonga text-light-yellow text-sm max-w-md overflow-auto w-2/3">
                Creator:
              </p>
              <p className="text-xs max-w-md overflow-auto w-2/3">
                {nft.addressOfCreator}
              </p>
              <p className="font-milonga text-sm text-light-yellow max-w-md overflow-hidden w-2/3">
                Voter:
              </p>
              <div className="text- max-w-md overflow-hidden w-2/3">
                {nft.voterWallets.map((item) => (
                  <div
                    className="flex flex-row justify-center items-center  "
                    key={item}
                  >
                    {/* Accessing properties from each item */}
                    <p className="text-xs max-w-md overflow-auto">{item}</p>
                  </div>
                ))}
              </div>
              {/* <ul className="w-full">
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
              </ul> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NftModal;
