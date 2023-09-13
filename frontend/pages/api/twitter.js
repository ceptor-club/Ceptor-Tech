/* import Twitter from 'twitter-api-v2'; */
import Twitter from 'twitter';

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY ?? '',
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET ?? '',
  access_token_key: process.env.ACCESS_TOKEN_KEY ?? '',
  access_token_secret: process.env.ACCESS_TOKEN_SECRET ?? '',
});

export default async function handler(req, res) {
  const { imageData } = req.body;
  console.log('from in api');
  if (typeof imageData === 'string') {
    console.log('imageData is a string');
  } else {
    console.log('imageData is not a string');
  }
  if (imageData) {
    res.status(200).json({ image: imageData });
    // Upload image to Twitter

    client.post(
      'media/upload',
      { media_data: imageData },
      function (error, media_data, response) {
        console.log(response);
        console.log('media data', media_data);
        if (!error) {
          // If successful, a media object will be returned.
          console.log(media_data);
          console.log(response);

          // Lets tweet it
          /*           var status = {
            status: 'I am a tweet',
            media_ids: media.media_id_string, // Pass the media id string
          };

          console.log(status.media_ids); */
        }
      }
    );

    if (!imageData || imageData.length < 10) {
      return res.status(400).json({ error: 'Invalid image data' });
    }

    // Post tweet with uploaded image
    /*     const tweet = {
      status: message,
      media_ids: media.media_id_string,
    };

    client.post('statuses/update', tweet, (error, tweet, response) => {
      if (!error) {
        console.log(tweet);
        res.status(200).json({ tweet: tweet });
      } else {
        console.log(error);
        res.status(500).json({ error: error });
      }
    }); */
  }
}
