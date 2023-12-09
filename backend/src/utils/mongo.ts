import { MongoClient } from "mongodb";
require("dotenv").config();

const url = process.env.DB_CONN_STRING as string
const client = new MongoClient(url)

interface User {
  _id: string;
  name: string;
  email: string | null;
  wallet: string;
  mailingList: boolean;
}

interface CharacterData {
  _id: string
  name: string
  owner: User["_id"]
}

export interface Submission {
  addressOfCreator: string;
  image: string;
  likesAmount: number;
  tokenID: number;
  chainId: number;
  voterWallets: string[];
}


const collectionNames = process.env.DB_COLLECTION?.split(',') || []
const usersCollection = client.db(process.env.DB_NAME!).collection<User>(collectionNames[0]);
const characterDataCollection = client.db(process.env.DB_NAME!).collection<CharacterData>(collectionNames[1]);
const submissionCollection = client.db(process.env.DB_NAME!).collection<Submission>(collectionNames[2]);

//function to connect to mongoDB and save a user to the database
export async function saveUser(user: any) {
  try {
    return usersCollection.insertOne(user)
  } catch (e) {
    console.error(e);
    return e;
  }
}

//function to connect to mongoDB and get a user from the database
export async function getUserByWallet(wallet: string) {
  try {
    return usersCollection.findOne({ wallet: wallet })
  } catch (error) {
    console.error(error)
    return error
  }
}

//function to get user by _id
export async function getUserById(_id: string) {
  try {
    return usersCollection.findOne({ _id: _id })
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function saveSubmission(submission: Submission) {
  try {
    return submissionCollection.insertOne(submission);
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getSubmissions() {
  try {
    return submissionCollection.find().toArray();
  } catch (error) {
    console.error(error);
    return error;
  }
}

// returning the most liked submission
export async function getMostLikedSubmission() {
  try {
    return submissionCollection
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
export async function voteForSubmission(tokenID: number, wallet: string) {
  try {
    // check if the wallet already voted
    const submissionAlreadyVoted = await submissionCollection
      .findOne({ tokenID, voterWallets: wallet });
    if (submissionAlreadyVoted) {
      return "already voted";
    }
    return submissionCollection
      .updateOne(
        { tokenID },
        { $addToSet: { voterWallets: wallet }, $inc: { likesAmount: 1 } }
      );
  } catch (error) {
    console.error(error);
    return error;
  }
}


//function to list all users
export async function getAllUsers() {
  try {
    const usersCursor = usersCollection.find();
    const usersArray = await usersCursor.toArray()
    return usersArray
  } catch (error) {
    throw new Error("Error retrieving users from the database");
  }
}

//function to save character data
export async function saveCharacterData(characterData: any, userId: string) {
  try {

    characterData.owner = getUserById(userId)
    return characterDataCollection.insertOne(characterData)
  } catch (error) {
    throw new Error("Error saving character data")
  }
}

//function to list all characters
export async function getAllCharacters() {
  try {
    const characterDataCursor = characterDataCollection.find()
    const characterDataArry = await characterDataCursor.toArray()
    return characterDataArry
  } catch (error) {
    throw new Error("Error retrieving character data from the database")
  }
}

//function to get character by id
export async function getCharacterById(_id: string) {
  try {
    return characterDataCollection.findOne({ _id: _id })
  } catch (error) {
    console.error(error)
    return error
  }
}