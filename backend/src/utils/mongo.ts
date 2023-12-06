import { MongoClient } from "mongodb"
require("dotenv").config()

interface User {
  _id: string
  name: string
  email: string | null
  wallet: string
  mailingList: boolean
}
interface promptOfTheWeekNFT {
  _id: string
  imageUrl: string
  weekTimestamp: number
  votes: number
}

const url = process.env.DB_CONN_STRING as string
const client = new MongoClient(url)

//function to connect to mongoDB and save a user to the database
export async function saveUser(user: any) {
  try {
    return client.db(process.env.DB_NAME!).collection<User>(process.env.DB_COLLECTION!).insertOne(user)
  } catch (e) {
    console.error(e)
  }
}



//function to connect to mongoDB and get a user from the database
export async function getUser(wallet: string) {
  try {
    return client.db(process.env.DB_NAME!).collection<User>(process.env.DB_COLLECTION!).findOne({ wallet: wallet })
  } catch (error) {
    console.error(error)
    return error
  }
}


// Function to connect to MongoDB and save a new NFT to the database
export async function saveNFT(nft: promptOfTheWeekNFT) {
  try {
    const result = await client
      .db(process.env.DB_NAME!)
      .collection<promptOfTheWeekNFT>(process.env.DB_COLLECTION!)
      .insertOne(nft);
    

    return result.insertedId; // Return the inserted ID
  } catch (error) {
    console.error(error);
    throw new Error('Failed to save NFT to the database');
  }
}

// Function to connect to MongoDB and update NFT votes
export async function updateNFTVotes(nft_id: string) {
  try {
    const result = await client
      .db(process.env.DB_NAME!)
      .collection<promptOfTheWeekNFT>(process.env.DB_COLLECTION!)
      .updateOne({ _id: nft_id}, { $inc: { votes: 1 } });

    if (result.modifiedCount !== 1) {
      throw new Error('Failed to update NFT votes in the database');
    }

    return result.modifiedCount; // Return the number of modified documents (should be 1)
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update NFT votes in the database');
  }
}



export async function getHighestVotedNFT(weekTimestamp: number) {
  try {
    const result = await client
      .db(process.env.DB_NAME!)
      .collection<promptOfTheWeekNFT>(process.env.DB_COLLECTION!)
      .findOne({ weekTimestamp: weekTimestamp }, { projection: { _id: 1 }, sort: { votes: -1 } });

    if (!result) {
      throw new Error('No NFT found for the specified week timestamp');
    }

    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to retrieve highest-voted NFT');
  }
}

