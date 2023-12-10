import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import WalletConnectButton from "./WalletConnectButton";

export default function CCID() {
  const [isCreateIDModalOpen, setIsCreateIDModalOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isLoginSuccessPopupOpen, setIsLoginSuccessPopupOpen] = useState(false);
  const [isLoginErrorPopupOpen, setIsLoginErrorPopupOpen] = useState(false);
  const router = useRouter();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      // Automatically close the "Your wallet is successfully connected" pop-up after 4 seconds and redirect to the uploadpage
      setTimeout(() => {
        setIsLoginSuccessPopupOpen(false);
        router.push("/uploadpage");
      }, 4000);
    }
  }, [isConnected, router]);

  const handleCreateIDClick = () => {
    if (!isConnected) {
      // Show the "Please connect your wallet" pop-up if the wallet is not connected
      setIsLoginPopupOpen(true);
    }
  };

  // Define the handleLoginClick function
  const handleLoginClick = () => {
    setIsLoginErrorPopupOpen(true);
  };

  const handleCloseLoginErrorPopup = () => {
    setIsLoginErrorPopupOpen(false);
  };

  return (
    <div className="bg-black text-white text-center py-20 px-10 relative h-screen">
      <div className="bg-black font-oswald text-white py-4 absolute top-0 left-0 right-0 text-center">
        <h1
          onClick={handleCreateIDClick}
          className="cursor-pointer text-2xl uppercase mb-2"
        >
          hackathon!
        </h1>
        <h2>0.11.30</h2>
      </div>
      <div className="text-light-yellow mt-40">
        <p className="text-2xl font-milonga mb-2">Welcome to the Ceptor Club</p>
        <p className="text-3xl font-oswald text-white">
          Create D&D character and storyline onchain!
        </p>
      </div>
      <div className="flex flex-col items-center mt-20">
        <button
          onClick={handleCreateIDClick}
          className="bags-button font-nothing-you-could-do text-xl uppercase text-black py-4 px-6 mb-5 rounded-lg w-1/4 cursor-pointer"
        >
          Create ID
        </button>

        <button
          onClick={handleLoginClick}
          className="bags-button font-nothing-you-could-do text-xl uppercase text-black py-4 px-6 mb-5 rounded-lg w-1/4 cursor-pointer"
        >
          Log-in
        </button>

        {isLoginPopupOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg text-center relative">
              <button
                onClick={() => setIsLoginPopupOpen(false)}
                className="absolute top-2 right-2 text-black text-lg cursor-pointer"
              >
                x
              </button>
              <p className="font-oswald text-black">
                Please connect your wallet and choose the network to mint your
                CCID (Ceptor Club ID)
              </p>
              <WalletConnectButton />
            </div>
          </div>
        )}

        {isLoginSuccessPopupOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg text-center relative">
              <p className="font-oswald text-black">
                Your wallet is successfully connected
              </p>
            </div>
          </div>
        )}

        {isLoginErrorPopupOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg text-center relative">
              <button
                onClick={handleCloseLoginErrorPopup}
                className="absolute top-2 right-2 text-black text-lg cursor-pointer"
              >
                x
              </button>
              <p className="font-oswald text-black">
                Please create the CCID first
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
