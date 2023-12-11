import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { addresses } from "../utils/addresses";
import { ceptorDiceABI } from "../utils/abis";

const BurnDiePage = () => {
  const router = useRouter();
  const { chain, chains } = useNetwork();
  const { address, isConnected } = useAccount();

  const { username, pfp } = router.query;

  /**
   * Hook for burning a die
   */
  const { config: configBurn } = usePrepareContractWrite({
    address: addresses[chain?.network]?.ceptorDice,
    abi: ceptorDiceABI,
    functionName: "timerBurn",
    args: [address, 5, 1],
  });

  // Hook for burning dice
  const { data: dataBurn, write: writeBurn } = useContractWrite(configBurn);

  const { isLoading: txnLoadingBurn, isSuccess: isSuccessBurn } =
    useWaitForTransaction({
      hash: dataBurn?.hash,
    });

  // Function to call to burn dice
  const burnDice = async () => {
    try {
      if (!isConnected) {
        open();
      } else if (isConnected) {
        console.log("wallet is connected");
      }
      console.log("burn dice");

      // TODO: comment in to burn dice
      // writeBurn();
      navigateToQuizPage();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccessBurn) {
      console.log("success burn", isSuccessBurn);
    }
  }, [isSuccessBurn]);

  const navigateToQuizPage = () => {
    router.push("/QuizPage");
  };

  return (
    <div className="bg-black text-white text-center py-20 px-10 relative h-screen">
      <div className="text-light-yellow mt-40">
        <p className="text-4xl font-nothing-you-could-do mb-2">
          Congrats, {username}!
        </p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-milonga text-white">You have a CCID</p>
      </div>
      <div className="text-center mt-8">
        <p className="text-xl font-oswald text-white">
          When you created your CCID, we gifted you a bag of dice.
        </p>
        <p className="text-xl font-oswald text-white">
          Click the burn button if you want to start creating your own Ceptor
          NFT{" "}
        </p>
      </div>
      {/* {pfp && (
        <div className="mt-4 text-center">
          <Image
            src={pfp}
            alt="Uploaded PFP"
            className="rounded-full w-32 h-32 mx-auto"
          />
        </div>
      )} */}
      <div className="flex justify-center mt-5">
        <button
          className="bg-orange-500 pl-3 pr-3 pt-1 text-2xl rounded-lg text-black font-nothing-you-could-do"
          onClick={burnDice}
        >
          Burn your first Die
        </button>
      </div>
      <p className="text-white font-oswald text-1xl mt-10 mb-5">
        New to D&D - Learn about characters
      </p>
      <div className="flex justify-center">
        <Link href="/nftpage">
          <button className="w-full bg-orange-500 pl-3 pr-3 pt-1 text-2xl rounded-lg text-black font-nothing-you-could-do hover:bg-opacity-90">
            Explore Characters
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BurnDiePage;
