import { SubmitData } from "../../utils/types";

export async function getCOWSubmissions(): Promise<SubmitData[]> {
  // Replace 'any' with the actual type of response
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/COWSubmissions`,
    {
      method: "GET",
      headers: {
        apikey: process.env.NEXT_PUBLIC_API_KEY,
      },
    }
  );

  console.log(response);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
}
