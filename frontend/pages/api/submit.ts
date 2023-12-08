import { SubmitData } from "../../utils/types";

export async function submit(data: SubmitData): Promise<string> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/submit`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.NEXT_PUBLIC_API_KEY,
      },
      body: JSON.stringify(data),
    }
  );

  console.log(response);

  if (response.ok) {
    return "success";
  }

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  // Handle response...
}
