import axios from "axios";

export async function getImages(data: any) {
  console.log("hello :", data);
  const obj = {
    prompt: data.prompt,
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
    method: 'POST',
    url: process.env.SD_API_ENDPOINT,
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '86b88a2dc1mshd611d568ecd2738p1ea496jsncf8335dc2d11',
      'X-RapidAPI-Host': 'stable-diffusion10.p.rapidapi.com'
    },
    data: JSON.stringify(obj),
  };

  const imagesData = await axios(config)
    .then(function (response) {
      //format images with 'data:image/png;base64,' at the front
      // console.log("lets see", response.data)
      response.data.data.images.forEach((image: Blob, i: number) => {
        response.data.data.images[i] = "data:image/png;base64," + image;
      });
      console.log("hooty", response.data.data.images.length)
      // console.log("RESPONSE DATA", response.data);
      // response.data.prompted = data;
      // console.log("RESPONSE DATA with prompt", response.data.prompted);
      return response.data.data;
    })
    .catch(function (error) {
      console.log("lets see")
      console.log(error);
      return error;
    });
  return imagesData;
}
