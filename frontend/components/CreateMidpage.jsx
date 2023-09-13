import React from "react"
import Image from "next/image"
import Link from "next/link"
import uploadIcon from "../public/images/CREATE-midpage/icon1.png"
import aiIcon from "../public/images/CREATE-midpage/icon2.png"
import choiceIcon from "../public/images/CREATE-midpage/icon3.png"
import nftIcon from "../public/images/CREATE-midpage/icon4.png"
import communityIcon from "../public/images/CREATE-midpage/icon5.png"
import diceIcon from "../public/images/CREATE-midpage/icon6.png"

export default function CreateMidpage() {
  return (
    <div className="m-1 p-1">
      {/* Content in the center */}
      <div className="flex md:flex-nowrap flex-wrap bg-[#0F1E31] h-full flex-col m-12 p-8 shadow-lg mt-5">
        <h1 className="pb-2 text-xl underline font-medium">Operation Dragonborn</h1>
        <h3 className="font-medium">
          Welcome to our free AI fantasy concept art generator. We are a worldwide party of role-players who came
          together to make an app that would make the process of playing a fantasy RPG together easier and more visually
          engaging. Make your Tabletop RPG character sheet into an incredible, original work of art in just a few steps.
          Try it out!
        </h3>
      </div>

      {/* Intruction Cards 1 - Responsive by Tippi */}
      <div className="flex justify-around flex-col mb-5 mr-12 ml-12 md:flex-row items-center">
        <div className="flex container flex-row sm:flex-col md:w-1/4 justify-center align-center items-center bg-[#110402] p-6 w-4/5 m-3">
          <p className="justify-center text-center">Upload Standard Character Sheet PDF</p>
          <Link href="#create">
            <Image src={uploadIcon} alt="Upload icon" className="w-40 h-40 object-contain pt-5 hover:cursor-pointer" />
          </Link>
        </div>
        <div className="flex flex-row sm:flex-col justify-center align-center items-center bg-[#110402] p-6 md:w-1/4 w-4/5 m-3">
          <p className="justify-center text-center">Parsing algorithm generates a prompt for our fine-tuned AI model</p>
          <Link href="#create">
            <Image src={aiIcon} alt="AI icon" className="w-40 h-40 object-contain pt-5" />
          </Link>
        </div>
        <div
          id="receive"
          className="flex flex-row sm:flex-col justify-center align-center items-center bg-[#110402] p-6 md:w-1/4 w-4/5 m-3"
        >
          <p className="justify-center text-center">Receive 3, 4 or 9 avatar images based on your character sheet</p>
          <Link href="#create">
            <Image src={choiceIcon} alt="icon3" className="w-40 h-40 object-contain pt-5" />
          </Link>
        </div>
      </div>

      {/* Explore Button */}
      <div className="flex justify-center">
        <button
          onClick={() =>
            alert("Explore button clicked, explore section id not yet implemented, please wait for future updates.")
          }
          href="#explore"
          className="  
                    rounded-full bg-[#0D9488] text-black pr-10 pl-10 pt-2 pb-2
                    border-2 border-black text-2xl hover:border-white hover:text-white"
        >
          EXPLORE
        </button>
      </div>

      {/* Instructional Cards 2 - @Development Interns */}
      <div className="flex justify-around flex-col mb-5 mt-5 mr-12 ml-12 md:flex-row items-center">
        <div className="flex container flex-row sm:flex-col md:w-1/4 justify-center align-center items-center bg-[#110402] p-6 w-4/5 m-3">
          <p className="justify-center text-center">Mint an ERC721 NFT Avatar</p>
          <Image src={nftIcon} alt="NFT icon" className="w-40 h-40 object-contain pt-5" />
        </div>
        <div className="flex container flex-row sm:flex-col md:w-1/4 justify-center align-center items-center bg-[#110402] p-6 w-4/5 m-3">
          <p className="justify-center text-center">Join the community</p>
          <Image src={communityIcon} alt="community icon" className="w-40 h-40 object-contain pt-5" />
        </div>
        <div className="flex container flex-row sm:flex-col md:w-1/4 justify-center align-center items-center bg-[#110402] p-6 w-4/5 m-3">
          <p className="justify-center text-center">Buy interactive dice to get gold</p>
          <Image src={diceIcon} alt="icon of a 20 sided dice" className="w-40 h-40 object-contain pt-5" />
        </div>
      </div>

      {/* Go Premium Button */}
      <div className="flex justify-center mt-8 mb-8">
        <Link href="#">
          {" "}
          <button
            onClick={() => alert("Go Premium button clicked, currently our service is free for all.")}
            className="  
                    rounded-full bg-[#CA8A04] text-black pr-10 pl-10 pt-2 pb-2
                    border-2 border-black text-2xl"
          >
            GO PREMIUM
          </button>
        </Link>
      </div>
    </div>
  )
}
