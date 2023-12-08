import { error } from "console";
import { VoteData } from "../../utils/types";

export async function voteForSubmission(data: VoteData): Promise<string> {
  export const response = await fetch(
    "http://localhost:4000/voteForSubmission",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: "testKey",
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
