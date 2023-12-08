import { MongoClient } from "mongodb";
require("dotenv").config();

interface User {
  _id: string;
  name: string;
  email: string | null;
  wallet: string;
  mailingList: boolean;
}

export interface Submission {
  addressOfCreator: string;
  image: string;
  likesAmount: number;
  tokenID: number;
  chainId: number;
  voterWallets: string[];
}

const url = process.env.DB_CONN_STRING as string;
const client = new MongoClient(url);

//function to connect to mongoDB and save a user to the database
export async function saveUser(user: any) {
  try {
    return client
      .db(process.env.DB_NAME!)
      .collection<User>(process.env.DB_COLLECTION!)
      .insertOne(user);
  } catch (e) {
    console.error(e);
    return e;
  }
}

//function to connect to mongoDB and get a user from the database
export async function getUser(wallet: string) {
  try {
    return client
      .db(process.env.DB_NAME!)
      .collection<User>(process.env.DB_COLLECTION!)
      .findOne({ wallet: wallet });
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function saveSubmission(submission: Submission) {
  try {
    return client
      .db(process.env.DB_NAME!)
      .collection("submissions")
      .insertOne(submission);
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getSubmissions() {
  try {
    return client
      .db(process.env.DB_NAME!)
      .collection("submissions")
      .find()
      .toArray();
  } catch (error) {
    console.error(error);
    return error;
  }
}

// returning the most liked submission
export async function getMostLikedSubmission() {
  try {
    return client
      .db(process.env.DB_NAME!)
      .collection("submissions")
      .find()
      .sort({ likesAmount: -1 })
      .limit(1)
      .toArray();
  } catch (error) {
    console.error(error);
    return error;
  }
}

// vote for a submission, only  one vote per wallet
export async function voteForSubmission(
  tokenID: number,
  wallet: string
) {
  try {
    // check if the wallet already voted
    const submissionAlreadyVoted = await client
      .db(process.env.DB_NAME!)
      .collection("submissions")
      .findOne({ tokenID, voterWallets: wallet });
    if (submissionAlreadyVoted) {
      return "already voted";
    }
    return client
      .db(process.env.DB_NAME!)
      .collection("submissions")
      .updateOne(
        { tokenID },
        { $addToSet: { voterWallets: wallet }, $inc: { likesAmount: 1 } }
      );
  } catch (error) {
    console.error(error);
    return error;
  }
}
