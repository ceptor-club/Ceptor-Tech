import Image from 'next/image';
import React from 'react';
import {
  useContractRead,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { CONSTANTS } from '../utils/CONSTANTS';
import { useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/react';
import Countdown from 'react-countdown';

const DiceDashboard = ({}) => {
  const [diceBalance, setDiceBalance] = useState({
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
  });
  const [userTimer, setUserTimer] = useState('');

  const { address, isConnected } = useAccount();

  const diceContract = {
    address: CONSTANTS.diceAddress,
    abi: CONSTANTS.diceABI,
  };

  const { data: userTimerRead } = useContractRead({
    address: CONSTANTS.ceptorAddress,
    abi: CONSTANTS.ceptorABI,
    functionName: 'userTimers',
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
        functionName: 'balanceOf',
        args: [address, 0],
      },
      {
        ...diceContract,
        functionName: 'balanceOf',
        args: [address, 1],
      },
      {
        ...diceContract,
        functionName: 'balanceOf',
        args: [address, 2],
      },
      {
        ...diceContract,
        functionName: 'balanceOf',
        args: [address, 3],
      },
      {
        ...diceContract,
        functionName: 'balanceOf',
        args: [address, 4],
      },
      {
        ...diceContract,
        functionName: 'balanceOf',
        args: [address, 5],
      },
    ],
    // allowFailure: true,
  });

  // Type and amount of dice to mint, Will be dynamic, just for testing
  const _ids = [5];
  const _amounts = [1];

  // Config for minting dice
  const { config: configMint } = usePrepareContractWrite({
    address: CONSTANTS.diceAddress,
    abi: CONSTANTS.diceABI,
    functionName: 'mintBatch',
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
        console.log('wallet is connected');
      }
      console.log('mint dice');

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
    address: CONSTANTS.diceAddress,
    abi: CONSTANTS.diceABI,
    functionName: 'timerBurn',
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
        console.log('wallet is connected');
      }
      console.log('burn dice');

      writeBurn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccessMinting || isSuccessBurn) {
      console.log('success burn', isSuccessBurn);
      refetch();
    }
    if (isConnected && diceData) {
      const newDiceBalance = {};
      diceData.forEach((balance, i) => {
        console.log('balance: ', i, parseInt(balance));
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
      <div className='mb-2'>
        {address ? (
          <>
            <p>Dice Balance</p>
            <p>0: {diceBalance[0]}</p>
            <p>1: {diceBalance[1]}</p>
            <p>2: {diceBalance[2]}</p>
            <p>3: {diceBalance[3]}</p>
            <p>4: {diceBalance[4]}</p>
            <p>5: {diceBalance[5]}</p>
            <button
              onClick={mintDice}
              className='block text-center p-2 bg-white text-black rounded-lg my-2 active:bg-gray-200'
            >
              {txnLoadingMinting ? 'Minting Dice...' : 'Mint Dice'}
            </button>
            <button
              onClick={burnDice}
              className='block text-center p-2 bg-orange-200 text-black rounded-lg my-2 active:bg-gray-200'
            >
              {txnLoadingBurn ? 'Burning Dice...' : 'Burn Dice'}
            </button>
            {userTimer && (
              <>
                <div>Time Remaining:</div>
                <Countdown date={userTimer} />
              </>
            )}
          </>
        ) : (
          <p>Connect to see dice balance</p>
        )}
      </div>
    </>
  );
};

export default DiceDashboard;
