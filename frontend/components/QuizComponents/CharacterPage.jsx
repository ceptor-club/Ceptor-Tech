import {
    setClass,
    calculateSavingThrows,
    calcXP,
    setAbilityScore,
    setProficiencyBonus,
    calculateAbilityModifier,
    calculateHitPoint,
    calculateSkill
} from '../QuizFunctions'
import { CharacterContext } from '../CharacterContext'
import { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'


export default function CharacterPage() {

    const { characterData, setCharacterData } = useContext(CharacterContext)
    console.log(characterData)
    let character = characterData

    // character.myAlignment = setAlignment(character.alignmentLawfulChaotic, character.alignmentGoodEvil)
    character.myClass = setClass(character.interest, character.weapon)
    let speciesAdj = character.species.toLowerCase()
    let genderPos = character.gender
    let genderObj = character.gender

    //Stats
    character.strength = setAbilityScore(character.interest, character.species, "strength")
    character.dexterity = setAbilityScore(character.interest, character.species, "dexterity")
    character.constitution = setAbilityScore(character.interest, character.species, "constitution")
    character.intelligence = setAbilityScore(character.interest, character.species, "intelligence")
    character.wisdom = setAbilityScore(character.interest, character.species, "sWiwisdoms")
    character.charisma = setAbilityScore(character.interest, character.species, "charisma")
    character.XP = calcXP(character.level)
    character.proficiencyBonus = setProficiencyBonus(character.level)

    // //Ability Modifiers
    character.strengthMod = calculateAbilityModifier(character.strength)
    character.dexterityMod = calculateAbilityModifier(character.dexterity)
    character.constitutionMod = calculateAbilityModifier(character.constitution)
    character.intelligenceMod = calculateAbilityModifier(character.intelligence)
    character.wisdomMod = calculateAbilityModifier(character.wisdom)
    character.charismaMod = calculateAbilityModifier(character.charisma)


    character.hitPoints = calculateHitPoint(character.constitutionMod, character.myClass, character.level)

    // //Saving Throws 
    character.savingThrowStrength = calculateSavingThrows(character.myClass, "strengthMod", character.proficiencyBonus, character.strengthMod)
    character.savingThrowDexterity = calculateSavingThrows(character.myClass, "dexterityMod", character.proficiencyBonus, character.dexterityMod)
    character.savingThrowConstitution = calculateSavingThrows(character.myClass, "constitutionMod", character.proficiencyBonus, character.constitutionMod)
    character.savingThrowIntelligence = calculateSavingThrows(character.myClass, "intelligenceMod", character.proficiencyBonus, character.intelligenceMod)
    character.savingThrowWisdom = calculateSavingThrows(character.myClass, "wisdomMod", character.proficiencyBonus, character.wisdomMod)
    character.savingThrowCharisma = calculateSavingThrows(character.myClass, "charismaMod", character.proficiencyBonus, character.charismaMod)

    // //Skills
    character.acrobatics = calculateSkill("dexterity", character.myClass, character.proficiencyBonus, character.dexterityMod)
    character.animalHandling = calculateSkill("wisdom", character.myClass, character.proficiencyBonus, character.wisdomMod)
    character.arcana = calculateSkill("intelligence", character.myClass, character.proficiencyBonus, character.intelligenceMod)
    character.athletics = calculateSkill("strenth", character.myClass, character.proficiencyBonus, character.strengthMod)
    character.deception = calculateSkill("charisma", character.myClass, character.proficiencyBonus, character.charismaMod)
    character.history = calculateSkill("intelligence", character.myClass, character.proficiencyBonus, character.intelligenceMod)
    character.insight = calculateSkill("wisdom", character.myClass, character.proficiencyBonus, character.wisdomMod)
    character.intimidation = calculateSkill("charisma", character.myClass, character.proficiencyBonus, character.charismaMod)
    character.investigate = calculateSkill("intelligence", character.myClass, character.proficiencyBonus, character.intelligenceMod)
    character.medicine = calculateSkill("wisdom", character.myClass, character.proficiencyBonus, character.wisdomMod)
    character.nature = calculateSkill("intelligence", character.myClass, character.proficiencyBonus, character.intelligenceMod)
    character.perception = calculateSkill("wisdom", character.myClass, character.proficiencyBonus, character.wisdomMod)
    character.performance = calculateSkill("charisma", character.myClass, character.proficiencyBonus, character.charismaMod)
    character.persuasion = calculateSkill("charisma", character.myClass, character.proficiencyBonus, character.charismaMod)
    character.religion = calculateSkill("intelligence", character.myClass, character.proficiencyBonus, character.intelligenceMod)
    character.sleightOfHand = calculateSkill("dexterity", character.myClass, character.proficiencyBonus, character.dexterityMod)
    character.stealth = calculateSkill("dexterity", character.myClass, character.proficiencyBonus, character.dexterityMod)
    character.survival = calculateSkill("wisdom", character.myClass, character.proficiencyBonus, character.wisdomMod)

    //Used for the Character Description
    const trait = {
        strength: character.strength,
        dexterity: character.dexterity,
        constitution: character.constitution,
        intelligence: character.intelligence,
        wisdom: character.wisdom,
        charisma: character.charisma
    };

    const findHighestTraitAndScore = (obj) => Object.entries(obj).reduce(([maxKey, maxValue], [key, value]) => value > maxValue ? [key, value] : [maxKey, maxValue], [null, -Infinity]);
    const [highestTrait, highestScore] = findHighestTraitAndScore(trait)
    const findLowestTraitAndScore = (obj) => Object.entries(obj).reduce(([minKey, minValue], [key, value]) => value < minValue ? [key, value] : [minKey, minValue], [null, Infinity]);
    const [lowestTrait, lowestScore] = findLowestTraitAndScore(trait)
    let ltModifier = setLTModifier(lowestScore)
    let htModifier = setHTModifier(highestScore)




    // Find High Trait
    function setHTModifier(highestTrait) {
        let value
        if (highestTrait > 18) {
            value = "astonishingly high";
        } else if (highestTrait > 14) {
            value = "breath-taking";
        } else if (highestTrait > 11) {
            value = "incredible";
        } else {
            value = "average";
        }
        return value
    }

    // Find Low Trait
    function setLTModifier(lowestTrait) {
        let value
        if (lowestTrait < 8) {
            value = "profoundly low";
        } else if (lowestTrait < 10) {
            value = "very low";
        } else if (lowestTrait < 14) {
            value = "only average";
        } else {
            value = "actually quite high by normal standards";
        }
        return value
    }

    // Species Data Used and Modified for the Character Description
    if (speciesAdj === "dwarf") {
        speciesAdj = "dwarven";
    } else if (speciesAdj === "elf") {
        speciesAdj = "elven";
    } else if (speciesAdj === "bugbear") {
        speciesAdj = "bugbearian";
    } else if (speciesAdj === "centaur") {
        speciesAdj = "centaurian";
    } else if (speciesAdj === "half-elf") {
        speciesAdj = "half-elven"
    }

    if (character.gender === "He") {
        genderObj = "him";
        genderPos = "his";
    } else if (character.gender === "She") {
        genderObj = "her";
        genderPos = "her";
    } else if (character.gender === "They") {
        genderObj = "them";
        genderPos = "their";
    }

    if (character.partyPos == "middle") {
        character.partyPos = " fight in the middle of the fray.";
    }
    else if (character.partyPos == "front") {
        character.partyPos = " lead the attack.";
    }
    else if (character.partyPos == "back") {
        character.partyPos = " support " + genderPos + " team from the back.";
    }

    let characterDescription = ''
    if (character.gender === 'They') {
        characterDescription = `${character.charName} is a level ${character.level} ${speciesAdj} ${character.myClass.toLowerCase()}. ${character.gender} have a background as a ${character.background.toLowerCase()} and maintain a ${character.myAlignment.toLowerCase()} alignment. ${character.charName} is known for ${genderPos} ${htModifier} ${highestTrait} but is not well-regarded for ${genderPos} ${lowestTrait}, which is ${ltModifier}. ${character.gender} prefer to use the ${character.weapon.toLowerCase()} in battle and like to ${character.partyPos}`
    } else {
        characterDescription = `${character.charName} is a level ${character.level} ${speciesAdj} ${character.myClass.toLowerCase()}. ${character.gender} has a background as a ${character.background.toLowerCase()} and maintains a ${character.myAlignment.toLowerCase()} alignment. ${character.charName} is known for ${genderPos} ${htModifier} ${highestTrait} but is not well-regarded for ${genderPos} ${lowestTrait}, which is ${ltModifier}. ${character.gender} prefers to use the ${character.weapon.toLowerCase()} in battle and likes to ${character.partyPos}`
    }


    function printCharacter() {

    }
    function connectWallet() {

    }

    function saveCharacter() {
        setCharacterData(character)
    }

    return (
        <>
            <div className='text-lg mx-16 mb-4'>
                {characterDescription}
            </div>
            <div className='flex flex-row mx-16'>
                <div className='flex flex-col m-2 text-base'>
                    <div className='' id="alignment-div">
                        <div id='Character-Alignment'>My Alignment: {character.myAlignment}</div>
                    </div>
                    <div className='' id="Level-div">
                        <div id='Character-Level'>My Level: {character.level}</div>
                    </div>
                    <div className='' id="Hitpoints-div">
                        <div id='Character-Level'>Hit Points: {character.hitPoints}</div>
                    </div>
                    <div className='' id="xp-div">
                        <div id='Character-XP'>Experience Points: {character.XP}</div>
                    </div>
                    <div className='' id="proficiency-div">
                        <div id="Character-Proficiency">Proficiency Bonus: {character.proficiencyBonus}</div>
                    </div>
                    <div className='' id="class-div">
                        <div id="Character-Class">My Class: {character.myClass}</div>
                    </div>
                    <div className='' id="species-div">
                        <div id="Character-Species">My Species: {character.species}</div>
                    </div>
                    <div className='' id="background-div">
                        <div id="Character-Background">My Background: {character.background}</div>
                    </div>
                    <div className='' id="background-div">
                        <div id="Character-Strength">Strength / Ability Modifier: {character.strength} / {character.strengthMod}</div>
                    </div>
                    <div className='' id="background-div">
                        <div id="Character-Dexterity">Dexterity / Ability Modifier: {character.dexterity} / {character.dexterityMod}</div>
                    </div>
                    <div className='' id="background-div">
                        <div id="Character-Constitution">Constitution / Ability Modifier: {character.constitution} / {character.constitutionMod}</div>
                    </div>
                    <div className='' id="background-div">
                        <div id="Character-Intelligence">Intelligence / Ability Modifier: {character.intelligence} / {character.intelligenceMod}</div>
                    </div>
                    <div className='' id="background-div">
                        <div id="Character-Wisdom">Wisdom / Ability Modifier: {character.wisdom} / {character.wisdomMod}</div>
                    </div>
                    <div className='' id="background-div">
                        <div id="Character-Charisma">Charisma / Ability Modifier: {character.charisma} / {character.charismaMod}</div>
                    </div>
                </div>
                <Image src='/images/CREATE/placeholder.png' alt='' width={1000} height={1000} className='ml-32 w-1/3 h-1/3' />
            </div>

            <br /><br />
            <div className="fixed bottom-0 right-64">
                <Link href='/'>
                    <button className="bg-ceptor border-0 text-black p-4 text-center no-underline inline-block text-base m-4" onClick={saveCharacter}>Save Character?</button>
                </Link>
            </div>

            {/* <button className='button' id='print-button' onClick={printCharacter()} >Print Character Sheet</button>

            <div id='web3-button'>
                <button className='button' id='next-button' onClick={connectWallet()} >Connect Wallet</button>
            </div> */}
        </>
    )
}