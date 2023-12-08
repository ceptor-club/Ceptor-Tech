import { SubmitData } from "../../utils/types";

export async function getMostLikedSubmission(): Promise<SubmitData> {
  // Replace 'any' with the actual type of response
  const response = await fetch("http://localhost:4000/mostLikedSubmission", {
    method: "GET",
    headers: {
      apikey: "testKey",
    },
  });

  console.log(response);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
}
