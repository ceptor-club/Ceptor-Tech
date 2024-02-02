import axios from "axios";

interface responseFormat {
  task_id: string;
  estimated_processing_time_seconds: number;
}

// Utility function to convert image URL to Base64
async function convertImageUrlToBase64(imageUrl: string): Promise<string> {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    return `data:${response.headers['content-type']};base64,${base64}`;
  } catch (error) {
    console.error('Error converting image to Base64', error);
    throw error;
  }
}

export async function sendPrompt(data: any) {
  console.log("hello :", data);
  const taskPrefix = "generate image of a"
  const obj = {
    task: `${taskPrefix} ${data.prompt}`,
    // seed: -1,
    // batch_size: 2,
    // n_iter: 1,
    // steps: 42,
    // cfg_scale: 9,
    // width: 512,
    // height: 512,
    // sampler_index: "Euler a",
    // send_images: true,
    // save_images: true,
  };

  let config = {
    method: "POST",
    url: process.env.SD_API_ENDPOINT,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.BAM_API_KEY}`,
    },
    data: JSON.stringify(obj),
  };

  // the post request will return an id and estimated time to completion
  // use the id to make a get request to the endpoint with the id after waiting for the estimated time
  // if its still pending it will return a 202, if its done it will return a 200 and the image
  // when its done, it returns a base64 encoded image in the results keyword
  // You might need to install node-fetch if you're using this in a Node.js environment
// import fetch from 'node-fetch';
try {
  const response = await axios(config);
  const { task_id, estimated_processing_time_seconds } = response.data;
  return { task_id, estimated_processing_time_seconds };
} catch (error) {
  console.error(error);
  return null;
}
  
}

async function fetchImage(responseData: responseFormat) {
  console.log("id :", responseData.task_id, "time :", responseData.estimated_processing_time_seconds)
  const endpoint = `${process.env.SD_API_ENDPOINT}${responseData.task_id}/`;

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${process.env.BAM_API_KEY}`,
          },
        });

        if (response.status === 200 && response.data.result?.content) {
          const base64Image = await convertImageUrlToBase64(response.data.result.content);
          // decode the base64 image
          resolve(base64Image);
        } else if (response.status === 202) {
          resolve(fetchImage(responseData));
        }
      }
        catch (error) {
        console.error(error);
        reject(error);
      }
    }, 500)
  });
}

export async function getImages(data: any) {
  const responseData1 = await sendPrompt(data);
  const responseData2 = await sendPrompt(data);

  const images = await Promise.all([
    fetchImage(responseData1 as responseFormat),
    fetchImage(responseData2 as responseFormat)
  ]);
  return { images };
}
