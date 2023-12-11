import axios from "axios";

export async function getImages(data: any) {
  console.log("hello :", data);
  const obj = {
    prompt: data.prompt,
    seed: -1,
    batch_size: 2,
    n_iter: 1,
    steps: 42,
    cfg_scale: 9,
    width: 512,
    height: 512,
    sampler_index: "Euler a",
    send_images: true,
    // save_images: true,
  };

  let config = {
    method: "post",
    url: process.env.SD_API_ENDPOINT,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(obj),
  };

  const imagesData = await axios(config)
    .then(function (response) {
      //format images with 'data:image/png;base64,' at the front
      response.data.images.forEach((image: Blob, i: number) => {
        response.data.images[i] = "data:image/png;base64," + image;
      });
      console.log("RESPONSE DATA", response.data);
      response.data.prompted = data;
      console.log("RESPONSE DATA with prompt", response.data.prompted);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
  return imagesData;
}