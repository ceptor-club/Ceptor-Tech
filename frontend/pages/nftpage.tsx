import React from "react";
import Link from "next/link";
import Explorer from "../components/Explorer";
import { getServerSideProperties } from "../utils/getServerSideProps";

export async function getServerSideProps() {
  getServerSideProperties();
}

const NFTPage = ({
  ALCHEMY_GOERLI_API_KEY,
  ALCHEMY_SEPOLIA_API_KEY,
  ALCHEMY_POLYGON_ZKEVM_API_KEY,
}: {
  ALCHEMY_GOERLI_API_KEY: string;
  ALCHEMY_SEPOLIA_API_KEY: string;
  ALCHEMY_POLYGON_ZKEVM_API_KEY: string;
}) => {
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
        nftList={[]}
      />
    </div>
  );
};

export default NFTPage;
