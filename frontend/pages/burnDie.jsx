import React from 'react';
import { useRouter } from 'next/router';

const BurnDiePage = () => {
  const router = useRouter();
  const { username } = router.query;

  // Function to navigate to the characterPage
  const navigateToCharacterPage = () => {
    router.push('/characterPage'); // Replace '/characterPage' with the actual route path
  };

  return (
    <div className="bg-black text-white text-center py-20 px-10 relative h-screen">
      <div className="text-light-yellow mt-40">
        <p className="text-2xl font-milonga mb-2">Congrats, {username}!</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-oswald text-white">You have a CCID</p>
      </div>
      <div className="flex justify-center mt-5">
        <button
          className="bg-orange-500 pl-3 pr-3 pt-1 text-2xl rounded-lg text-black font-nothing-you-could-do"
          onClick={navigateToCharacterPage}
        >
          Burn a Die to Create a Ceptor
        </button>
      </div>
      <p className="text-white font-oswald text-1xl mt-4">
        New to D&D - Learn about characters
      </p>
      <div className="flex justify-center">
        <button
          className="bg-white pl-3 pr-3 pt-1 text-2xl rounded-lg text-black font-nothing-you-could-do"
          onClick={() => {
            /* logic to explore characters */
          }}
        >
          Explore characters
        </button>
      </div>
    </div>
  );
};

export default BurnDiePage;
