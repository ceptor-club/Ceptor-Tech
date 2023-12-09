import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const CharacterPage = () => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 p-4">
      <div className="text-center p-4 bg-black text-white w-full max-w-xs">
        <p className="mb-4">Create a Character</p>
      </div>
      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <Link href="/QuizPage">
          <button
            style={{ backgroundColor: '#2F0213', height: '48px', marginTop: '0.5rem' }}
            className="text-white font-bold py-2 px-4 rounded hover:bg-opacity-90 w-full"
          >
            Take the Quiz
          </button>
        </Link>
        <Link href="/exploreCharactersPage">
          <button
            className="text-white font-bold py-2 px-4 rounded hover:bg-opacity-90 w-full"
            style={{ backgroundColor: '#2F0213', height: '48px' }}
          >
            Explore Characters
          </button>
        </Link>
        <Link href="/fillInTheBlanksPage">
          <button
            className="text-white font-bold py-2 px-4 rounded hover-bg-opacity-90 w-full"
            style={{ backgroundColor: '#2F0213', height: '48px' }}
          >
            Fill in the Blanks
          </button>
        </Link>
        <Link href="/ORC">
          <button
            className="text-white font-bold py-2 px-4 rounded hover-bg-opacity-90 w-full"
            style={{ backgroundColor: '#2F0213', height: '48px' }}
          >
            ORCS (upload)
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CharacterPage;
