<<<<<<< HEAD
import { NFTStorage, File } from 'nft.storage';
=======
import { NFTStorage, File } from "nft.storage";
>>>>>>> tech-dev

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
<<<<<<< HEAD
  console.log('fetchImage', fetchImage);
  const blob = await fetchImage.blob();
  const file = new File([blob], 'something.png', { type: 'image/png' });
=======
  console.log("fetchImage", fetchImage);
  const blob = await fetchImage.blob();
  const file = new File([blob], "something.png", { type: "image/png" });
>>>>>>> tech-dev
  return file;
};

async function createStructuredMetadata(pdfData, prompt, someBinaryImageData) {
  // const imageFile = new File([someBinaryImageData], "diffused.png", {
  //   type: "image/png",
  // })

  //make binary image data into blob
  // const blob = new Blob([someBinaryImageData], { type: "image/png" })
  // console.log("imageFile", blob)

  const imageFile = await base64EncodedImage(someBinaryImageData);

<<<<<<< HEAD
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
        value: 'Wizard',
      },
      {
        trait_type: 'Race',
        value: 'Dragonborn!',
      },
      {
        trait_type: 'Prompt',
        value: prompt,
      },
      {
        trait_type: 'Level',
=======
  console.log("imageFile", imageFile);

  const structuredMetadata = {
    name: "Wizard NFT!",
    likesAmount: "2",
    tokenID: 2,
    description:
      "This is a wizard NFT, created during 'Operation Dragonborn' by our fearless heroes and the Scope Creeper! Just try to funge it. You can't do it.",
    image: imageFile,
    external_url: "https://operation-dragonborn.vercel.app/",
    attributes: [
      {
        trait_type: "Class",
        value: "Wizard",
      },
      {
        trait_type: "Race",
        value: "Dragonborn!",
      },
      {
        trait_type: "Prompt",
        value: prompt,
      },
      {
        trait_type: "Level",
>>>>>>> tech-dev
        value: 1,
        max_value: 20,
      },
      {
<<<<<<< HEAD
        trait_type: 'Strength',
        value: 5,
      },
      {
        trait_type: 'Dexterity',
        value: 5,
      },
      {
        trait_type: 'Constitution',
        value: 5,
      },
      {
        trait_type: 'Intelligence',
        value: 5,
      },
      {
        trait_type: 'Wisdom',
        value: 5,
      },
      {
        trait_type: 'Charisma',
=======
        trait_type: "Strength",
        value: 5,
      },
      {
        trait_type: "Dexterity",
        value: 5,
      },
      {
        trait_type: "Constitution",
        value: 5,
      },
      {
        trait_type: "Intelligence",
        value: 5,
      },
      {
        trait_type: "Wisdom",
        value: 5,
      },
      {
        trait_type: "Charisma",
>>>>>>> tech-dev
        value: 5,
      },
      {
        value: pdfData.playerName ? pdfData.playerName : pdfData.name,
      },
      {
<<<<<<< HEAD
        trait_type: 'Background',
=======
        trait_type: "Background",
>>>>>>> tech-dev
        value: pdfData.background,
      },
    ],
  };

  return structuredMetadata;
}

module.exports = { avatarNFTSTORAGE };
