import React from "react";
import { useState, useEffect } from "react";

const tips = [
  "Never bring a knife to a fireball fight",
  "Be careful who you push off rooftops",
  "Eating the mushrooms was a good idea",
  "Eating the cheese was a bad idea",
  "Gold is kinda heavy",
  "Don't trust the [insert race here] is racist",
  "Our artificers are teaching the Creator to draw from character sheets",
  "The Beholder Feature reads character sheets",
  "Gathering loot? You can save your art as a file or a collectible token",
  "The Grimoire feature is being scripted. Do you want a player or artist profile?",
  "Visionaries Wanted in service of her majesty's royal Artistic Integrity Board",
  "Sometimes the Gamemaster will have you describe your killing blow",
  "The Bird Who Could Fly drew sold out audiences to see the legendary performance of Locrian",
  "There is no one looking after your magic items but you and the thief",
  "GM: spends 6 hours building a multilevel dungeon < Party: Lets go roast a monster carcass",
  "Wood Elves run incredibly fast, if it suits the story",
  "Sometimes it is more dangerous to do nothing",
  "The DM is not your enemy",
  "The DM is not your friend",
  "The DM is not your therapist",
  "TSR first published Gygaxs original D&D rpg in 1974",
  "Fans animated the final episode of the 1983 D&D cartoon in 2020",
  "Final Fantasy debuted on the console in year 1987",
  "Vampire: The Masquerades live action game had a RPS mechanic with a bomb",
  "The mutation table from Gamma World was, hands down, the best one",
  "AD&D Launched in 1989, followed by 3rd edition in 2000, 3.5 in 2003 and the current 5e in 2014.",
  "Typically, players ignore 4th edition.",
  "D&D movies are cursed, probably",
  "The first D&D movie was released in 2000",
  "Feed the new creations! Join our public discord channel and become a club member",
  "Are you an artist? Sign up for early access to sell commissions",
  "If something breaks or could be fixed let us know with a bug report",
];

export const LoadingTips = () => {
  //choose random tip and set it to state
  const [tip, setTip] = useState(tips[Math.floor(Math.random() * tips.length)]);

  //in useeffect, set interval to change tip every 5 seconds
  //clear interval on unmount
  useEffect(() => {
    const interval = setInterval(() => {
      setTip(tips[Math.floor(Math.random() * tips.length)]);
    }, 3300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-4xl m-5 flex justify-center items-center h-1/2 w-1/2 bg-black bg-opacity-40 rounded-lg">
      {/* <h3>Tip</h3> */}

      <p className="text-center p-5">{tip}</p>
    </div>
  );
};
