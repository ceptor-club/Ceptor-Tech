import Image from "next/image";
import { Logo } from "./Logo";
import React, { useState, useRef } from "react";
import Link from "next/link";
import WalletConnectButton from "./Buttons/WalletConnectButton";
import DiceDashboard from "./DiceDashboard";

export default function NavbarMdUp() {
  const [navMenuVisible, setNavMenuVisible] = useState(true);
  // Define the toggleNavMenu function
  const toggleNavMenu = () => {
    setNavMenuVisible(!navMenuVisible);
  };

  return (
    <>
      {/* Large screens */}
      <div className="hidden md:block">
        <nav
          className={`${
            navMenuVisible ? `w-48` : "w-12"
          } h-12 fixed z-20 md:h-full left-0 bg-black bg-opacity-80`}
        >
          <div
            className="bg-white w-8 h-8 rounded-full absolute -right-4 top-6 cursor-pointer"
            onClick={toggleNavMenu}
          ></div>

          {navMenuVisible ? (
            <>
              <div className="w-full flex flex-col ml-6 mt-6">
                <Image
                  src="/logo.png"
                  alt=""
                  width={50}
                  height={50}
                  className="mb-6"
                />
                {/* TODO: Check all hrefs */}
                <Link className="uppercase" href="/QuizPage">
                  Quiz
                </Link>
                <Link className="uppercase" href="/create">
                  Create{" "}
                </Link>
                <Link className="uppercase" href="/nftpage">
                  Explore{" "}
                </Link>
                <Link className="uppercase" href="/profile">
                  Profile{" "}
                </Link>
                <Link className="uppercase" href="/weekly-challenge">
                  Weekly Challenge
                </Link>
                <Link className="uppercase" href="/buy-dice">
                  Buy Dice{" "}
                </Link>
                <Link className="uppercase" href="/free-dice">
                  Free Dice{" "}
                </Link>
                <Link className="uppercase" href="/burn-dice">
                  Burn Dice{" "}
                </Link>
              </div>
              <div className="fixed bottom-6 ml-6">
                <DiceDashboard />
                <WalletConnectButton />
              </div>
            </>
          ) : null}
        </nav>
      </div>
    </>
  );
}
