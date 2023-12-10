import React, { useEffect, useState } from "react";
import Link from "next/link";
import Explorer from "../components/Explorer";

import { getServerSideProperties } from "../utils/getServerSideProps";
import { SubmitData } from "../utils/types";
import { COWsubmissionsMock } from "../utils/mock";

export async function getServerSideProps() {
  return getServerSideProperties();
}
export default function NFTPage({
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
  const [nftList, setNFTList] = useState<SubmitData[]>([]);

  const getAllSubmission = async () => {
    // TODO: replace mock data
    // const result = await getCOWSubmissions();
    const result = COWsubmissionsMock;
    console.log(result);
    setNFTList(result);
  };

  useEffect(() => {
    // get this weeks challenge

    getAllSubmission();
  }, []);

  return (
    <div>
      <Link href="/" className="fixed top-4 left-4 z-50">
        <span className="text-xl text-white underline cursor-pointer font-black">
          Return
        </span>
      </Link>
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
