import Image from "next/image";
import { Logo } from "./Logo";
import React, { useState, useRef } from "react";
import Link from "next/link";

export default function NavbarSmUp() {
  const [navMenuVisible, setNavMenuVisible] = useState(true);
  // Define the toggleNavMenu function
  const toggleNavMenu = () => {
    setNavMenuVisible(!navMenuVisible);
  };

  return (
    <>
      {/* Small screens */}
      <div className="md:hidden border">
        <nav
          className={`${
            navMenuVisible ? `h-32` : "h-8"
          } w-full fixed z-20 bottom-0 left-0 bg-black bg-opacity-90`}
        >
          <div
            className="bg-white w-8 h-8 rounded-full absolute left-4 -top-4"
            onClick={toggleNavMenu}
          ></div>

          {navMenuVisible ? (
            <>
              <div className="w-full h-24 flex flex-col ml-6 mt-6">
                {/* TODO: Check all hrefs */}
                <Link className="uppercase" href="/QuizPage">
                  Quiz
                </Link>
                <Link className="uppercase" href="/">
                  Create{" "}
                </Link>
                <Link className="uppercase" href="/nftpage">
                  Explore{" "}
                </Link>
                <Link className="uppercase" href="/profile">
                  Profile{" "}
                </Link>
                <Link className="uppercase" href="/gameScheduler">
                  Game Scheduler
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
            </>
          ) : null}
        </nav>
      </div>
    </>
  );
}
