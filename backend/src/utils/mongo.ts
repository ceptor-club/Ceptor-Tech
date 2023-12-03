import { MongoClient } from "mongodb"
require("dotenv").config()

const url = process.env.DB_CONN_STRING as string
const client = new MongoClient(url)

interface User {
  _id: string
  name: string
  email: string | null
  wallet: string
  mailingList: boolean
}

interface CharacterData {
  name: string
  owner: User["_id"]
}

const collectionNames = process.env.DB_COLLECTION?.split(',') || []
const usersCollection = client.db(process.env.DB_NAME!).collection<User>(collectionNames[0]);
const characterDataCollection = client.db(process.env.DB_NAME!).collection<CharacterData>(collectionNames[1]);

//function to connect to mongoDB and save a user to the database
export async function saveUser(user: any) {
  try {
    return usersCollection.insertOne(user)
  } catch (e) {
    console.error(e)
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

export async function saveCharacterData(characterData: any) {
  try {
    return characterDataCollection.insertOne(characterData)
  } catch (error) {
    throw new Error("Error saving character data")
  }
}

export async function getAllCharacters() {
  try {
    const characterDataCursor = characterDataCollection.find()
    const characterDataArry = await characterDataCursor.toArray()
    return characterDataArry
  } catch (error) {
    throw new Error("Error retrieving character data from the database")
  }
}