import React, { useEffect } from 'react';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';
import { useWeb3Modal } from '@web3modal/react';

// type Props = {}

const WalletConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { open, isOpen, close } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  // const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
  //   message: "",
  // })

  const handleConnect = (e) => {
    e.preventDefault();
    if (!isConnected) return open();
    console.log('already connected to wallet', address);
  };

  const handleDisconnect = (e) => {
    e.preventDefault();
    if (isConnected) return disconnect();
    console.log('not connected to wallet', address);
  };

  useEffect(() => {
    if (isConnected) {
      console.log('connected to wallet', address);
    }
  }, [isConnected, address]);

  return (
    <div>
      {isConnected ? (
        <button
          className='text-black bg-red-700  focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-red-600 hover:bg-[#F87171] hover:text-white dark:focus:ring-red-800'
          onClick={handleDisconnect}
        >
          Wallet Disconnect
        </button>
      ) : (
        <button
          className='text-black bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-red-600 hover:bg-[#F87171] hover:text-white dark:focus:ring-red-800'
          onClick={handleConnect}
        >
          Wallet Connect
        </button>
      )}
    </div>
  );
};

export default WalletConnectButton;
