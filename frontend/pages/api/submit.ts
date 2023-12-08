import { SubmitData } from "../../utils/types";

export async function submit(data: SubmitData): Promise<string> {
  const response = await fetch("http://localhost:4000/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: "testKey",
    },
    body: JSON.stringify(data),
  });

  console.log(response);

  if (response.ok) {
    return "success";
  }

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  // Handle response...
}
