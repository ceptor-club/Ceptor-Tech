import React from 'react';
import { useRouter } from 'next/router';

const BurnDiePage = () => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 p-4">
      <div className="text-center p-4 bg-black text-white w-full max-w-xs">
        <p className="mb-2">congrats, {username}! you have a CCID</p>
      </div>
      <button
        style={{ backgroundColor: '#2F0213' }}
        className="mt-4 text-white font-bold py-2 px-4 rounded w-full max-w-xs hover:bg-opacity-90"
        onClick={() => { /* logic to burn a die */ }}
      >
        Burn a Die to Create a Ceptor
      </button>
      <p className="mt-4" style={{ color: '#2F0213' }}>
        New to D&D - Learn about characters
      </p>
      <button
        className="mt-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full max-w-xs"
        onClick={() => { /* logic to explore characters */ }}
      >
        Explore characters
      </button>
    </div>
  );
};

export default BurnDiePage;
