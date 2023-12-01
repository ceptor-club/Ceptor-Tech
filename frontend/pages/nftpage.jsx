import React from 'react';
import Link from 'next/link';
import Explorer from '../components/explorer';

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

const NFTPage = ({ ALCHEMY_GOERLI_API_KEY, ALCHEMY_SEPOLIA_API_KEY }) => {
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
      />
    </div>
  );
};

export default NFTPage;