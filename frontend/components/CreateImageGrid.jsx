import Image from 'next/image';
import React from 'react';
import { useEffect } from 'react';
import { LoadingTips } from './LoadingTips';
import Placeholder from '../public/images/CREATE/placeholder.png';
import { useState } from 'react';
import Script from 'next/script';
import { TwitterShareButton } from 'react-twitter-embed';
import { CONSTANTS } from '../utils/CONSTANTS';

export const CreateImageGrid = ({
  imageProcessing,
  imageResult,
  error,
  pdfData,
  setSelectedImage,
  storedNFTImage,
}) => {
  const [currentSelection, setCurrentSelection] = useState(false);

  //needs work
  function shareTweetTest() {
    // Data for Tweet
    const url = 'https://ceptor.club/';
    const tweetText = 'Check out my new CeptorClub Avatar!';
    const hashtags = 'dnd';
    const media_id = '1536740723734741009';

    const credentials = `${process.env.TWITTER_CONSUMER_KEY}:${process.env.TWITTER_CONSUMER_SECRET}`;
    const encodedKey = btoa('AJ5rAMxJu006udZlBd4S2agZH');
    const encodedSecret = btoa(
      'a77mb6hZUWR908rxo7JkOmy9NliBP34LC7ZDWZrRKkJ69jKxti'
    );
    console.log('encoded', encodedKey, encodedSecret);

    // Combine tweet data, open a new page for tweeting
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${tweetText}&hashtags=${hashtags}&media_id=${media_id}`;
    window.open(twitterShareUrl, '_blank');
  }

  // Not working currently
  async function shareTweet() {
    // Upload base64Image data to twitter and get back media_id
    try {
      const response = await fetch('/api/twitter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageData: CONSTANTS.testBase64Image,
        }),
      });

      // Need to get media_id, not getting the right data back, authentication issues
      const data = await response.json();

      // Data for Tweet
      const url = 'https://ceptor.club/';
      const tweetText = 'Check out my new CeptorClub Avatar!';
      const hashtags = 'dnd';
      const media_id = '1536740723734741009';

      // Combine tweet data, open a new page for tweeting
      const twitterShareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${tweetText}&hashtags=${hashtags}&media_id=${media_id}`;
      window.open(twitterShareUrl, '_blank');

      if (data) {
        // data is just the 64image file not the uploaded image, need the media id of the stored image
        console.log(data, 'success');
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('HEY YOU', error);
    }
  }

  useEffect(() => {
    if (imageProcessing) console.log('imageProcessing: ', imageProcessing);
    // console.log("imageProcessing: ", imageProcessing);
    // console.log("imageResult: ", imageResult);
  }, [imageProcessing, imageResult]);

  function handleImageSelect(image, e) {
    e.preventDefault();
    setSelectedImage(image);
    setCurrentSelection(parseInt(e.target.id));
    console.log(image);
    console.log('currentselection', currentSelection);
  }

  function handleDblClick(e) {
    e.preventDefault();
    // this needs written to display double clicked result image full screen
  }

  if (error)
    return (
      <div className='flex justify-center items-center h-full text-3xl'>
        <p className=' text-red-400'>{error}</p>
      </div>
    );
  if (imageProcessing)
    //TODO: RENDER TIPS
    return;

  // <div className="flex justify-center items-center h-full text-3xl">
  // <LoadingTips />
  /* <Image
          src="https://media.tenor.com/43s33wGTNo0AAAAC/sweating-nervous.gif"
          alt="sweating-nervous"
          width={256}
          height={256}
        /> */
  // </div>

  if (!pdfData)
    return (
      <div className='flex justify-center items-center h-full text-3xl'>
        <p className=' text-yellow-400 '>Please upload a character sheet!</p>
      </div>
    );
  else if (imageResult)
    return (
      <>
        <div className='flex gap-4 justify-center items-center flex-wrap lg:flex-nowrap'>
          {imageResult.images.map((image, i) => {
            return (
              <>
                <div className='flex flex-col justify-center items-center max-w-[512px] max-h-[512px]'>
                  <Image
                    className={`cursor-pointer m-2 ${
                      currentSelection === i ? 'border border-8' : null
                    }`}
                    key={i}
                    id={i}
                    onClick={(e) => handleImageSelect(image, e)}
                    onDoubleClick={(e) => handleDblClick(e)}
                    src={image}
                    alt=''
                    width={512}
                    height={512}
                  />
                </div>
              </>
            );
          })}
        </div>
      </>
    );
  else if (pdfData) {
    return (
      <div className='flex justify-center items-center h-full text-3xl'>
        <p className=' text-emerald-400'>
          We have your character sheet parsed, you can now generate your image!
        </p>
      </div>
    );
  }
  return (
    <div className='grid grid-cols-1 gap-0 p-4 border'>
      <div className={`${imgState}`}>
        <Image src={Placeholder} alt='' />
      </div>
      <div className=''>
        <Image src={Placeholder} alt='' />
      </div>
      <div className=''>
        <Image src={Placeholder} alt='' />
      </div>
      <div className=''>
        <Image src={Placeholder} alt='' />
      </div>
      <div className=''>
        <Image src={Placeholder} alt='' />
      </div>
      <div className=''>
        <Image src={Placeholder} alt='' />
      </div>
      <div className=''>
        <Image src={Placeholder} alt='' />
      </div>
      <div className=''>
        <Image src={Placeholder} alt='' />
      </div>
      <div className=''>
        <Image src={Placeholder} alt='' />
      </div>
    </div>
  );
};
