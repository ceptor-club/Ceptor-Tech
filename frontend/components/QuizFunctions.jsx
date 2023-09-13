//Generates Stat Scores
//Rolls 4 dice and discards the lowest roll - always modifies to 8 if lower.
function rollAbilityScore() {
    let roll1 = Math.floor(Math.random() * 6) + 1;
    let roll2 = Math.floor(Math.random() * 6) + 1;
    let roll3 = Math.floor(Math.random() * 6) + 1;
    let roll4 = Math.floor(Math.random() * 6) + 1;

    let totalScore = 0;

    let result = [roll1, roll2, roll3, roll4].sort().filter((_, i) => i);
    result.forEach(function (value) {
        totalScore += value;
    });
    //Always at least 8.
    if (totalScore < 8) {
        totalScore = 8;
    }
    return totalScore;

}
function setAbilityScore(interest, species, ability) {
    let score = rollAbilityScore();

    //Add to stat based on race, interest, and background responses.
    score += addInterestModifiers(interest);
    score += addSpeciesModifiers(species, ability);
    return score
}

//Add to stats based on quiz response.
function addInterestModifiers(interest, ability) {
    let score = 0
    if (interest == "interestStr" && ability == 'strength') {
        score += 3;
    }
    else if (interest == "interestDex" && ability == 'dexterity') {
        score += 3;
    }
    else if (interest == "interestCon" && ability == 'constitution') {
        score += 3
    }
    else if (interest == "interestInt" && ability == 'intelligence') {
        score += 3;
    }
    else if (interest == "interestWis" && ability == 'wisdom') {
        score += 3;
    }
    else if (interest == "interestCha" && ability == 'charisma') {
        score += 3;
    }
    return score
}


function addSpeciesModifiers(species, ability) {
    let score = 0
    if (species == "Elf") {
        if (ability == 'dexterity') {
            score += 2
        } else if (ability == 'wisdom') {
            score += 2
        } else if (ability == 'charisma') {
            score++
        }
    } else if (species == "Human" || species == "Half-Elf") {
        score++
    } else if (species == "Halfling") {
        if (ability == 'dexterity' || ability == 'charisma') {
            score++
        }
    } else if (species == "Dragonborn") {
        if (ability == 'strength') {
            score += 2
        } else if (ability == 'charisma') {
            score++
        }
    } else if (species == "Dwarf") {
        if (ability == 'strength' || ability == 'constitution') {
            score += 2
        }
    } else if (species == "Bugbear") {
        if (ability == 'strength') {
            score += 2
        } else if (ability == 'dexterity') {
            score++
        }
    } else if (species == "Half-Orc") {
        if (ability == 'strength') {
            score += 2
        } else if (ability == 'constitution') {
            score++
        }
    } else if (species == "Centaur") {
        if (ability == 'strength') {
            score += 2
        } else if (ability == 'wisdom') {
            score++
        }
    } else if (species == "Zombie") {
        if (ability == 'strength') {
            score += 3
        } else if (ability == 'wisdom' || ability == 'intelligence') {
            score -= 2
        }
    }
    return score
}

function calculateAbilityModifier(value) {

    switch (value) {
        case 1: return -5
        case 2: return -4
        case 3: return -4
        case 4: return -3
        case 5: return -3
        case 6: return -2
        case 7: return -2
        case 8: return -1
        case 9: return -1
        case 10: return 0
        case 11: return 0
        case 12: return +1
        case 13: return +1
        case 14: return +2
        case 15: return +2
        case 16: return +3
        case 17: return +3
        case 18: return +4
        case 19: return +4
        case 20: return +5
        case 21: return +5
        case 22: return +6
        case 23: return +6
        case 24: return +7
        case 25: return +7
        case 26: return +8
        case 27: return +8
        case 28: return +9
        case 29: return +9
        case 30: return +10
    }

}


//Find skill score and add to it if class is proficient.
function calculateSkill(trait, myClass, proficiencyBonus, modifier) {
    let returnValue = 0;

    if (trait == "strength") {
        returnValue += modifier;
        if (myClass == "Fighter" || myClass == "Barbarian" || myClass == "Paladin") {
            returnValue += proficiencyBonus;

        }
    } else if (trait == "dexterity") {
        returnValue += modifier;
        if (myClass == "Rogue" || myClass == "Ranger") {
            returnValue += proficiencyBonus;
        }
    } else if (trait == "intelligence") {
        returnValue += modifier;
        if (myClass == "Sorcerer" || myClass == "Wizard" || myClass == "Warlock") {
            returnValue += proficiencyBonus;
        }
    } else if (trait == "wisdom") {
        returnValue += modifier;
        if (myClass == "Cleric" || myClass == "Druid" || myClass == "Monk") {
            returnValue += proficiencyBonus;
        }
    } else if (trait == "charisma") {
        returnValue += modifier;
        if (myClass == "Bard") {
            returnValue += proficiencyBonus;
        }
    }

    return returnValue;
}

//Calculate Character Hit Points
function calculateHitPoint(constitutionMod, myClass, level) {
    let hitPoints = 0;

    if (myClass == "Barbarian") {
        hitPoints = 12 + constitutionMod + addHpPerLevel(12, constitutionMod, level);
    }
    else if (myClass == "Fighter" || myClass == "Paladin" || myClass == "Ranger") {
        hitPoints = 10 + constitutionMod + addHpPerLevel(10, constitutionMod, level);
    }
    else if (myClass == "Bard" || myClass == "Cleric" || myClass == "Druid" || myClass == "Monk" || myClass == "Rogue" || myClass == "Warlock") {
        hitPoints = 8 + constitutionMod + addHpPerLevel(8, constitutionMod, level);
    }
    else if (myClass == "Sorcerer" || myClass == "Wizard") {
        hitPoints = 6 + constitutionMod + addHpPerLevel(6, constitutionMod, level);
    }
    return hitPoints
}

//Add additional hit points for each level. 
function addHpPerLevel(die, constitutionMod, level) {
    let extraHealth = 0;
    if (level > 1) {
        let extraHealthRolls = level - 1;
        let currentRolls = 0;
        while (currentRolls < extraHealthRolls) {
            extraHealth += Math.floor(Math.random() * die) + 1;
            extraHealth += constitutionMod;
            currentRolls++;
            console.log('extraHealth = ' + extraHealth);
        }
    }
    return extraHealth;
}

//Set XP based on character level.
function calcXP(level) {


    switch (level) {

        case '1': return 0
        case '2': return 300
        case '3': return 900
        case '4': return 2700
        case '5': return 6500
        case '6': return +14000
        case '7': return 23000
        case '8': return 34000
        case '9': return 48000
        case '10': return 64000
        case '11': return 85000
        case '12': return 100000
        case '13': return 120000
        case '14': return 140000
        case '15': return 165000
        case '16': return 195000
        case '17': return 225000
        case '18': return 265000
        case '19': return 305000
        case '20': return 355000
    }

}

//Determine Proficiency Bonus Score Based on Player Level
function setProficiencyBonus(level) {
    return Math.ceil((Number(level) + 1) / 4) + 1;
}

//Calculate Saving throws based on ability modifier and add proficiency bonuses based on class.
function calculateSavingThrows(myClass, modifier, proficiencyBonus, ability) {
    const savingThrowLookup = {
        "Barbarian": ["strengthMod", "constitutionMod"],
        "Fighter": ["strengthMod", "constitutionMod"],
        "Monk": ["dexterityMod", "strengthMod"],
        "Ranger": ["dexterityMod", "strengthMod"],
        "Bard": ["dexterityMod", "charismaMod"],
        "Rogue": ["dexterityMod", "intelligenceMod"],
        "Sorcerer": ["constitutionMod", "charismaMod"],
        "Cleric": ["wisdomMod", "charismaMod"],
        "Paladin": ["wisdomMod", "charismaMod"],
        "Warlock": ["wisdomMod", "charismaMod"],
        "Wizard": ["wisdomMod", "intelligenceMod"],
        "Druid": ["wisdomMod", "intelligenceMod"],
    };

    const applicableModifiers = savingThrowLookup[myClass];
    const isApplicableModifier = applicableModifiers.includes(modifier);

    return isApplicableModifier ? proficiencyBonus + ability : ability;
}


//Set Class Based on Interests and Preferred Weapon Types
function setClass(interest, weapon) {
    const classLookup = {
        interestStr: {
            "Two-Handed Sword": "Barbarian",
            "Bastard Sword": "Fighter",
            "Bo Staff": "Monk",
            "Halberd": "Fighter",
            "Throwing Knives": "Rogue",
            "Spiked Mace": "Cleric",
            "Cross Bow": "Ranger",
        },
        interestDex: {
            "Two-Handed Sword": "Ranger",
            "Bastard Sword": "Rogue",
            "Bo Staff": "Monk",
            "Halberd": "Fighter",
            "Throwing Knives": "Rogue",
            "Spiked Mace": "Cleric",
            "Cross Bow": "Ranger",
        },
        interestInt: {
            "Two-Handed Sword": "Paladin",
            "Bastard Sword": "Rogue",
            "Bo Staff": "Sorcerer",
            "Halberd": "Cleric",
            "Throwing Knives": "Monk",
            "Spiked Mace": "Druid",
            "Cross Bow": "Rogue",
        },
        interestWis: {
            "Two-Handed Sword": "Paladin",
            "Bastard Sword": "Ranger",
            "Bo Staff": "Warlock",
            "Halberd": "Fighter",
            "Throwing Knives": "Wizard",
            "Spiked Mace": "Druid",
            "Cross Bow": "Sorcerer",
        },
    };

    // If the combination of interest and weapon is not found, default to "Fighter"
    return classLookup[interest]?.[weapon] || "Fighter";
}

module.exports = { setClass, calculateSavingThrows, calcXP, setAbilityScore, setProficiencyBonus, calculateAbilityModifier, calculateHitPoint, calculateSkill }
