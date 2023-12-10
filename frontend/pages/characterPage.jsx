import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const CharacterPage = () => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div className="bg-black text-white flex flex-col items-center justify-center h-screen p-4">
      <div className="text-center p-4 bg-black text-white w-full max-w-xs">
        <p className="font-oswald text-4xl uppercase mb-4">Create a Character</p>
      </div>
      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <Link href="/QuizPage">
          <button
            className="bg-orange-500 pl-3 pr-3 pt-1 text-2xl rounded-lg text-black font-nothing-you-could-do hover:bg-opacity-90 w-full"
          >
            Take the Quiz
          </button>
        </Link>
        <Link href="/exploreCharactersPage">
          <button
            className="bg-orange-500 pl-3 pr-3 pt-1 text-2xl rounded-lg text-black font-nothing-you-could-do hover:bg-opacity-90 w-full"
          >
            Explore Characters
          </button>
        </Link>
        <Link href="/fillInTheBlanksPage">
          <button
            className="bg-orange-500 pl-3 pr-3 pt-1 text-2xl rounded-lg text-black font-nothing-you-could-do hover:bg-opacity-90 w-full"
          >
            Fill in the Blanks
          </button>
        </Link>
        <Link href="/ORC">
          <button
            className="bg-orange-500 pl-3 pr-3 pt-1 text-2xl rounded-lg text-black font-nothing-you-could-do hover:bg-opacity-90 w-full"
          >
            ORCS (upload)
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CharacterPage;
