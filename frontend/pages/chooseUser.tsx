import React, { useState } from "react";
import { useRouter } from "next/router";
import { addresses } from "../utils/addresses";
import { CeptorCCIDABI } from "../utils/abis";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";

const Userpage = () => {
  const { chain, chains } = useNetwork();
  const { address, isConnected } = useAccount();

  const router = useRouter();
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [isUsernameErrorPopupOpen, setIsUsernameErrorPopupOpen] =
    useState(false);

  const handleRoleSelection = (role) => {
    if (username.trim() === "") {
      setIsUsernameErrorPopupOpen(true);
      return;
    }

    const userValue = role === "Gamemaster" ? "gm" : "player";
    setUser(userValue);
    router.push(
      `/burnDieStart?username=${encodeURIComponent(
        username
      )}&user=${encodeURIComponent(userValue)}`
    );
  };

  /**
   * Hook for registering a Player
   */
  const { config: configRegisterPlayer } = usePrepareContractWrite({
    address: addresses[chain?.network]?.ccipV4,
    abi: CeptorCCIDABI,
    functionName: "registerPlayer",
    args: [username],
  });

  //
  const {
    data: dataRegisterPlayer,
    isLoading: isLoadingRegisterPlayer,
    isSuccess: isSuccessRegisterPlayer,
    write: writeRegisterPlayer,
  } = useContractWrite(configRegisterPlayer);

  const registerPlayer = async () => {
    try {
      if (!isConnected) {
        open();
      } else if (isConnected) {
        console.log("wallet is connected");
      }
      console.log("register player");

      // writeRegisterPlayer();
      // TODO: add check for successful registration
      // isSuccessRegisterPlayer && handleRoleSelection("player");
      handleRoleSelection("player");
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Hook for for registering a GameMaster
   */
  const { config: configRegisterGameMaster } = usePrepareContractWrite({
    address: addresses[chain?.network]?.ccipV4,
    abi: CeptorCCIDABI,
    functionName: "registerPlayer",
    args: [username],
  });

  const {
    data: dataGameMaster,
    isLoading: isLoadingGameMaster,
    isSuccess: isSuccessGameMaster,
    write: writeGameMaster,
  } = useContractWrite(configRegisterGameMaster);

  const registerGameMaster = async () => {
    try {
      if (!isConnected) {
        open();
      } else if (isConnected) {
        console.log("wallet is connected");
      }
      console.log("register Game Master");

      writeGameMaster();
      // TODO: add check for successful registration
      // isSuccessGameMaster && handleRoleSelection("gm");
      handleRoleSelection("gm");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClosePopup = () => {
    setIsUsernameErrorPopupOpen(false);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center text-white">
      <div className="bg-black text-white py-4 px-2 text-center ">
        <h1 className="font-milonga text-4xl uppercase text-light-yellow">
          Create your Ceptor Club ID
        </h1>
        <h1 className="font-oswald text-2xl uppercase text-white">
          and choose your role
        </h1>
      </div>
      <div className="text-center mt-4">
        <input
          type="text"
          placeholder="Enter username"
          className="border-2 border-white rounded-lg p-2 m-4 w-64 text-center text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="text-center">
        <p className="text-white font-oswald text-xl mb-4">Choose your role</p>
        <div className="flex flex-col items-center space-y-5">
          <button
            className="bags-button font-nothing-you-could-do text-xl uppercase text-black py-4 px-6 m-2 rounded-lg cursor-pointer"
            onClick={() => registerGameMaster()}
          >
            Gamemaster
          </button>
          <button
            className="bags-button font-nothing-you-could-do text-xl uppercase text-black py-4 px-6 m-2 rounded-lg cursor-pointer"
            onClick={() => registerPlayer()}
          >
            Player
          </button>
        </div>
      </div>

      {isUsernameErrorPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg text-center relative">
            <button
              onClick={handleClosePopup}
              className="absolute top-0 right-0 text-black text-lg cursor-pointer p-2"
            >
              x
            </button>
            <p className="font-oswald text-black">
              Please enter your username first
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Userpage;