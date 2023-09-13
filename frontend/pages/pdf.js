import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
{
  /* <link id="pagestyle" href="default.css" rel="stylesheet" type="text/css" />; */
}

export default function Home() {
  const [data, setData] = useState({
    race: "",
    class: "",
  });
  const [imageProcessing, setImageProcessing] = useState(false); //processing state ie. loading...
  const [error, setError] = useState(null); //error msg
  const [imageResult, setImageResult] = useState(null); //url

  const setValue = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const send = async () => {
    setImageProcessing(true);
    console.log("data: ", data);
    //send req to backend with data to get the goods
    let result = await fetch("/api/getImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        data: data,
      }),
    }); //result is given as a URL in S3 bucket or smth
    result = await result.json();
    if (result.error) setError(result.error);
    console.log("result from image processing", result);
    setImageResult(result);
    setImageProcessing(false);
  };

  return (
    <div id="bodytype">
      <h1>DnDnDiffusion</h1>
      {/* input takes in text for now, but eventually allows a .pdf upload */}
      {/* <form method="post"> */}

      <div id="inputs">
        <input
          onChange={(e) => setValue(e)}
          type="text"
          name="race"
          placeholder="Enter your race"
        />
        <input
          onChange={(e) => setValue(e)}
          type="text"
          name="class"
          placeholder="Enter your class"
        />
        <select id="gender" name="gender">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non-Binary">Non-Binary</option>
        </select>

        <button onClick={send} type="submit" name="submit">
          {imageProcessing ? "Waiting for image..." : "Send"}
        </button>
      </div>
      <br></br>

      <div id="imagegeneration">
        {imageResult && (
          <Image src={imageResult.imageUrl} alt={"its your image!"} />
        )}
      </div>
      <div id="inputs">
        <button type="button">Enhance!</button>
        <button type="button">Save as NFT</button>
      </div>
    </div>
  );
}
