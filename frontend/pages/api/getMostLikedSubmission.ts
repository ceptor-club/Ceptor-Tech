import { SubmitData } from "../../utils/types";

export async function getMostLikedSubmission(): Promise<SubmitData> {
  // Replace 'any' with the actual type of response
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/mostLikedSubmission`,
    {
      method: "GET",
      headers: {
        apikey: "testKey",
      },
    }
  );

  console.log(response);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
}
