import { NFTStorage, File } from 'nft.storage';
import { useContext } from 'react';
import { CharacterContext } from '../components/CharacterContext';

const token = process.env.NEXT_PUBLIC_NFT_STORAGE;

// takes in base64 binary image data
async function avatarNFTSTORAGE(someBinaryImageData, prompt, pdfData) {
  const client = new NFTStorage({ token: token });
  const uploadObject = await createStructuredMetadata(
    pdfData,
    prompt,
    someBinaryImageData
  );
  const metadata = await client.store(uploadObject);
  return metadata.url;
}

const base64EncodedImage = async (base64ImageString) => {
  const fetchImage = await fetch(base64ImageString);
  console.log('fetchImage', fetchImage);
  const blob = await fetchImage.blob();
  const file = new File([blob], 'something.png', { type: 'image/png' });
  return file;
};

async function createStructuredMetadata(pdfData, prompt, someBinaryImageData) {
  // const imageFile = new File([someBinaryImageData], "diffused.png", {
  //   type: "image/png",
  // })

  //make binary image data into blob
  // const blob = new Blob([someBinaryImageData], { type: "image/png" })
  // console.log("imageFile", blob)
  const characterData = useContext(CharacterContext)

  const imageFile = await base64EncodedImage(someBinaryImageData);

  console.log('imageFile', imageFile);

  const structuredMetadata = {
    name: 'Wizard NFT!',
    description:
      "This is a wizard NFT, created during 'Operation Dragonborn' by our fearless heroes and the Scope Creeper! Just try to funge it. You can't do it.",
    image: imageFile,
    external_url: 'https://operation-dragonborn.vercel.app/',
    attributes: [
      {
        trait_type: 'Class',
        value: characterData.myClass,
      },
      {
        trait_type: 'Race',
        value: characterData.species,
      },
      {
        trait_type: 'Prompt',
        value: prompt,
      },
      {
        trait_type: 'Level',
        value: characterData.level,
        max_value: 20,
      },
      {
        trait_type: 'Strength',
        value: characterData.strength,
      },
      {
        trait_type: 'Dexterity',
        value: characterData.dexterity,
      },
      {
        trait_type: 'Constitution',
        value: characterData.constitution,
      },
      {
        trait_type: 'Intelligence',
        value: characterData.inteligence,
      },
      {
        trait_type: 'Wisdom',
        value: characterData.wisdom,
      },
      {
        trait_type: 'Charisma',
        value: characterData.charisma,
      },
      {
        value: pdfData.playerName ? pdfData.playerName : pdfData.name,
      },
      {
        trait_type: 'Background',
        value: characterData.background,
      },
    ],
  };

  return structuredMetadata;
}

module.exports = { avatarNFTSTORAGE };
