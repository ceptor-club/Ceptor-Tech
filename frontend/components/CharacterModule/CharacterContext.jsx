import { createContext, useState } from "react";

const CharacterContext = createContext();

const CharacterProvider = ({ children }) => {
  const [characterData, setCharacterData] = useState({
    playerName: "Ceptor",
    charName: "",
    level: "",
    gender: "",
    weapon: "",
    interest: "",
    partyPos: "",
    species: "",
    background: "",
    strength: "",
    dexterity: "",
    constitution: "",
    intelligence: "",
    wisdom: "",
    charisma: "",
    hitPoints: "",
    myClass: "",
    proficiencyBonus: "",
    XP: "",
    myAlignment: "",
    //updating names of the keys to make it easier for others to read

    strengthMod: "",
    dexterityMod: "",
    constitutionMod: "",
    intelligenceMod: "",
    wisdomMod: "",
    charismaMod: "",

    savingThrowStrength: "",
    savingThrowDexterity: "",
    savingThrowConstitution: "",
    savingThrowIntelligence: "",
    savingThrowWisdom: "",
    savingThrowCharisma: "",

    acrobatics: "",
    animalHandling: "",
    arcana: "",
    athletics: "",
    deception: "",
    history: "",
    insight: "",
    intimidation: "",
    investigate: "",
    medicine: "",
    nature: "",
    perception: "",
    performance: "",
    persuasion: "",
    religion: "",
    sleightOfHand: "",
    stealth: "",
    survival: "",
  });

  return (
    <CharacterContext.Provider value={{ characterData, setCharacterData }}>
      {children}
    </CharacterContext.Provider>
  );
};

export { CharacterContext, CharacterProvider };
