import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const CharacterPage = () => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div className="bg-black text-white flex flex-col items-center justify-center h-screen p-4">
      <div className="text-center p-4 bg-black text-white w-full max-w-xs">
        <p className="font-oswald text-4xl uppercase mb-4">
          Create a Character
        </p>
      </div>
      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <Link href="/QuizPage">
          <button className="relative w-full">
            <span className="absolute top-0 right-0 bg-orange-500 pl-1 pr-1 pt-1 text-black text-xs rounded-tr-lg font-nothing-you-could-do">
              (i)
              <span className="opacity-0 transition-opacity hover:opacity-100 absolute top-0 right-0 bg-white text-black p-2 text-xs rounded-lg mt-1 mr-1 w-40 font-oswald">
                Quiz redesigned and improved by the Games Team
              </span>
            </span>
            <span className="bg-orange-500 pl-3 pr-3 pt-1 text-2xl rounded-lg text-black font-nothing-you-could-do hover:bg-opacity-90 w-full">
              Take the Quiz
            </span>
          </button>
        </Link>
        <Link href="/nftpage">
          <button className="w-full bg-orange-500 pl-3 pr-3 pt-1 text-2xl rounded-lg text-black font-nothing-you-could-do hover:bg-opacity-90">
            Explore Characters
          </button>
        </Link>
        {/* <Link href="">
          <button className="w-full bg-orange-500 pl-3 pr-3 pt-1 text-2xl rounded-lg text-black font-nothing-you-could-do hover:bg-opacity-90">
            Fill in the Blanks
          </button>
        </Link>
        <Link href="">
          <button className="w-full bg-orange-500 pl-3 pr-3 pt-1 text-2xl rounded-lg text-black font-nothing-you-could-do hover:bg-opacity-90">
            ORCS (upload)
          </button>
        </Link> */}
      </div>
    </div>
  );
};

export default CharacterPage;
