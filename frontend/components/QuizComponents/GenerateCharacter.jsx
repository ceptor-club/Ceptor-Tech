import { CharacterContext } from "../CharacterContext";
import { useContext } from "react";
import Link from "next/link";

export default function GenerateCharacter(
    {
        charName,
        level,
        gender,
        weapon,
        interest,
        partyPos,
        species,
        background,
        State,
        setCurrentState,
        myAlignment
    }
) {

    const { characterData, setCharacterData } = useContext(CharacterContext)


    function newChar() {
        let updatedAlignment;

        if (myAlignment === "Neutral Neutral" || myAlignment === "Neutral") {
            updatedAlignment = "True Neutral";
        } else if (myAlignment === "Chaotic") {
            updatedAlignment = "Chaotic Neutral";
        } else if (myAlignment === "Lawful") {
            updatedAlignment = "Lawful Neutral";
        } else {
            updatedAlignment = myAlignment;
        }

        const updatedCharacterData = {
            ...characterData,
            charName: charName,
            level: level,
            gender: gender,
            weapon: weapon,
            interest: interest,
            partyPos: partyPos,
            species: species,
            background: background,
            myAlignment: updatedAlignment
        }

        setCharacterData(updatedCharacterData)
        setCurrentState(State.CHARACTER_PAGE)
    }

    return (
        <div className="flex justify-center items-center ">
            <div className="mx-auto">
                <button
                    type='submit'
                    className="bg-ceptor border-0 text-black p-4 text-center no-underline inline-block text-lg font-bold m-4"
                    onClick={() => newChar()}
                >
                    <span role="img" aria-label="character">👤</span> Generate New Character
                </button>
                <div className="text-transparent hover:text-white w-4">
                    <Link href='/UnrulyPage'>
                        {"What's this?"}
                    </Link>
                </div>
            </div>
        </div>
    )
}