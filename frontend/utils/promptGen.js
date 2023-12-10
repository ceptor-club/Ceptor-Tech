const styleOf = "Medieval hero portrait, fantasy illustration";
const descriptives = "unreal 5 render, 8k";

//TODO: dont use positive negative, use -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 MAYBE

const conversions = {
  // these are distractions to our sprint goal of getting a dragonborn to work, but they are good to have for the future
  // it's also a little confusing how these are used, so we should probably clean this up
  //classes
  cleric: "DnDCleric",
  druid: "druid",
  bard: "bard",
  warlock: "warlock",
  paladin: "paladin",
  artificer: "engineer and tinkerer",
  ranger: "archer",
  rogue: "rogue",

  //races
  // Non-Dragonborn Solution 1.  -- Front end displays warning if not dragonborn
  dragonborn: "Dungeons and dragons, dragonborn",
  dwarf: "dwarf",
  elf: "elf",
  gnome: "gnome",
  human: "human",
  halfling: "thing that's half a human",
  halfelf: "half-elf half-human, long ears",
  halforc: "half-orc half-human, big teeth",
  tiefling: "horned forest demon",
  "wood elf": "wood elf",
  aarakocra: "humanoid bird",

  // Dragonborn Solution 1.
  // dragonborn: "DnDDragonbornGeneral",
  // dwarf: "DnDDragonbornGeneral",
  // elf: "DnDDragonbornGeneral",
  // gnome: "DnDDragonbornGeneral",
  // human: "DnDDragonbornGeneral",
  // halfling: "DnDDragonbornGeneral",
  // halfelf: "DnDDragonbornGeneral",
  // halforc: "DnDDragonbornGeneral",
  // tiefling: "DnDDragonbornGeneral",
  // "wood elf": "DnDDragonbornGeneral",
  // aarakocra: "DnDDragonbornGeneral",

  //backgrounds used to put the character in a scene
  entertainer: "performing a song in a tavern",
  hermit: "meditating in a cave",
  criminal: "stealing from a shop",
  noble: "dressed in finery, in a fancy noble's castle",
  soldier: "fighting in a battle",
  sage: "wearing glasses in a fantastic ancient library",
  acolyte: "wearing a robe in a temple",
  charlatan: "in a tavern, telling a tall tale",
  gladiator: "in a colosseum, fighting a beast",
  folkhero: "rescuing a cat from a tree",
  "guild artisan": "in a workshop",
  "guild merchant": "in a shop with gold coins",
  knight: "charging in a castle",
  outlander: "wandering in a forest",
  urchin: "poor in an alleyway",
  pirate: "pirate on a ship, in the style of piratepunk",
  fartraveller: "walking on cloud",

  //armorWorn

  //9 alignments converted into 9 different cinematic lighting descriptive
  "lawful good": "bright lighting, warm lighting, golden lighting",
  "neutral good": "bright light and some shadow",
  "chaotic good": "dramatic lighting, high contrast",
  "lawful neutral": "direct light",
  "true neutral": "balanced light and shadow",
  "chaotic neutral": "dramatic lighting, high contrast",
  "lawful evil": "evil dark lighting, underlight, cinematic lighting",
  "neutral evil": "disdainful ambient lighting, deep shadows, smoke",
  "chaotic evil": "sinister dramatic dark lighting, mysterious glows",
};

export default conversions;

const createPrompt = (data) => {
  //IDEA: could pull synonyms from a thesaurous api and use those to create more interesting prompts
  //IDEA2: could connect to chatGPT3 and use that to create more interesting prompts

  const adjectives = []; //stats adjs - why is this a bad way of doing this bit?

  Object.keys(data).forEach((key) => {
    //handle stats
    if (data[key][0] > 3) {
      // console.log("pos", key, data[key]);
      adjectives.push(conversions[key].positive);
    } else if (data[key][0] < 0) {
      // console.log("neg", key, data[key]);
      adjectives.push(conversions[key].negative);
    }
  });
  // console.log("adjectives: ", adjectives);
  // returns a prompt with:
  // alignment, race (converted to prompt language or our unique identifier such as DnDDragonborn),
  // class, armorWorn, background & scene, descriptives
  return `${styleOf} of ${data.feature} ${data.gender ? data.gender : ""} ${
    data.color ? data.color : ""
  } ${
    conversions[data.race.toLowerCase()]
      ? conversions[data.race.toLowerCase()]
      : data.race
  }, ${
    conversions[data.class.toLowerCase()]
      ? `${conversions[data.class.toLowerCase()]},`
      : data.class
  } ${data.armorWorn ? `wearing ${data.armorWorn} armor` : data.armorWorn} ${
    conversions[data.background.toLowerCase()]
      ? conversions[data.background.toLowerCase()]
      : data.background // or "in a cavern" or "in a mine"
  }, ${
    conversions[data.alignment.toLowerCase()]
      ? `${conversions[data.alignment.toLowerCase()]},`
      : ""
  } ${descriptives}.`;

  // Non-Dragonborn Solution 1.
  // return `${ styleOf } of(${ data.alignment }) ${ data.race } ${
  //   conversions[data.race.toLowerCase()]
  // }, ${conversions[data.class.toLowerCase()]}, wearing ${
  //   data.armorWorn
  // } and holding a small dragon, ${
  //   conversions[data.background.toLowerCase()]
  // }, ${descriptives}, in the style of ${styleOf}`;
};

module.exports = { createPrompt };
