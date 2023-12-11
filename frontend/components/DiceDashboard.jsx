import React from "react";
import {
  useContractRead,
  useContractReads,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { CONSTANTS } from "../utils/CONSTANTS";
import { useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { ceptorABI, ceptorDiceABI } from "../utils/abis";
import { addresses } from "../utils/addresses";
import { NavbarTimer } from "./NavBar/index";
import { NavbarDiceBag } from "./NavBar/index";

const DiceDashboard = ({}) => {
  const { chain, chains } = useNetwork();

  const [diceBalance, setDiceBalance] = useState({
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
  });
  const [userTimer, setUserTimer] = useState("");

  const { address, isConnected } = useAccount();

  const diceContract = {
    address: addresses[chain?.network]?.ceptorDice,
    abi: ceptorDiceABI,
  };

  const { data: userTimerRead } = useContractRead({
    address: addresses[chain?.network]?.ceptors,
    abi: ceptorABI,
    functionName: "userTimers",
    args: [address],
    watch: true,
  });

  useEffect(() => {
    if (userTimerRead) {
      const unixTimestamp = parseInt(userTimerRead) * 1000;
      setUserTimer(unixTimestamp);
    }
  }, [userTimerRead]);

  // Get user dice balances
  const {
    data: diceData,
    isError,
    isLoading,
    refetch,
  } = useContractReads({
    contracts: [
      {
        ...diceContract,
        functionName: "balanceOf",
        args: [address, 0],
      },
      {
        ...diceContract,
        functionName: "balanceOf",
        args: [address, 1],
      },
      {
        ...diceContract,
        functionName: "balanceOf",
        args: [address, 2],
      },
      {
        ...diceContract,
        functionName: "balanceOf",
        args: [address, 3],
      },
      {
        ...diceContract,
        functionName: "balanceOf",
        args: [address, 4],
      },
      {
        ...diceContract,
        functionName: "balanceOf",
        args: [address, 5],
      },
    ],
    // allowFailure: true,
  });

  // TODO: Move Logic into the burn and buy page after the hackathon
  // Type and amount of dice to mint, Will be dynamic, just for testing
  const _ids = [5];
  const _amounts = [1];

  // Config for minting dice
  const { config: configMint } = usePrepareContractWrite({
    address: diceContract.address,
    abi: diceContract.abi,
    functionName: "mintBatch",
    args: [_ids, _amounts],
  });

  // Hook for minting dice
  const { data, write: writeMint } = useContractWrite(configMint);

  const { isLoading: txnLoadingMinting, isSuccess: isSuccessMinting } =
    useWaitForTransaction({
      hash: data?.hash,
    });

  // Function to call to mint dice
  const mintDice = async () => {
    try {
      if (!isConnected) {
        open();
      } else if (isConnected) {
        console.log("wallet is connected");
      }
      console.log("mint dice");

      writeMint();
    } catch (error) {
      console.log(error);
    }
  };

  // Type and amount of dice to burn, Will be dynamic, just for testing

  const _idsBurn = [0];
  const _amountsBurn = [1];

  // Config for burning dice
  const { config: configBurn } = usePrepareContractWrite({
    address: addresses[chain?.network]?.ceptorDice,
    abi: ceptorDiceABI,
    functionName: "timerBurn",
    args: [address, _idsBurn, _amountsBurn],
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

      writeBurn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccessMinting || isSuccessBurn) {
      console.log("success burn", isSuccessBurn);
      refetch();
    }
    if (isConnected && diceData) {
      const newDiceBalance = {};
      diceData.forEach((balance, i) => {
        console.log("balance: ", i, parseInt(balance));
        newDiceBalance[i] = parseInt(balance);
      });

      setDiceBalance(newDiceBalance);
    }
  }, [
    isConnected,
    diceData,
    address,
    userTimer,
    isSuccessMinting,
    isSuccessBurn,
  ]);

  return (
    <>
      <>
        {address ? (
          <div>
            <div className="flex flex-row space-x-2">
              <button
                onClick={mintDice}
                className=" button-xs block text-center p-2  text-black rounded-lg my-2 active:bg-gray-200"
              >
                {txnLoadingMinting ? "Minting Dice..." : "Mint Dice"}
              </button>
              <button
                onClick={burnDice}
                className=" button-xs block text-center p-2 text-black rounded-lg my-2 active:bg-gray-200"
              >
                {txnLoadingBurn ? "Burning Dice..." : "Burn Dice"}
              </button>
            </div>
            <>
              <NavbarTimer userTimer></NavbarTimer>
              <NavbarDiceBag diceBalance={diceBalance}></NavbarDiceBag>
            </>
          </div>
        ) : (
          <p className="font-oswald text-wrap ">Connect to see dice balance</p>
        )}
      </>
    </>
  );
};

export default DiceDashboard;
