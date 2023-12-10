import React from 'react';
import { useRouter } from 'next/router';

const BurnDiePage = () => {
  const router = useRouter();
  const { username, pfp } = router.query;

  const navigateToBurnDiePage = () => {
    router.push('/burn-dice');
  };

  const navigateToCharacterPage = () => {
    router.push('/characterPage');
  };

  return (
    <div className="bg-black text-white text-center py-20 px-10 relative h-screen">
      <div className="text-light-yellow mt-40">
        <p className="text-2xl font-milonga mb-2">Congrats, {username}!</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-oswald text-white">You have a CCID</p>
      </div>
      {pfp && (
        <div className="mt-4 text-center">
          <img
            src={pfp}
            alt="Uploaded PFP"
            className="rounded-full w-32 h-32 mx-auto"
          />
        </div>
      )}
      <div className="flex justify-center mt-5">
        <button
          className="bg-orange-500 pl-3 pr-3 pt-1 text-2xl rounded-lg text-black font-nothing-you-could-do"
          onClick={navigateToBurnDiePage}
        >
          Burn a Die to Create a Ceptor
        </button>
      </div>
      <p className="text-white font-oswald text-1xl mt-10">
        New to D&D - Learn about characters
      </p>
      <div className="flex justify-center">
        <button
          className="bg-white pl-3 pr-3 pt-1 text-2l mt-2 rounded-lg text-black font-nothing-you-could-do"
          onClick={navigateToCharacterPage}
        >
          Explore characters
        </button>
      </div>
    </div>
  );
};

export default BurnDiePage;
