import { MongoClient } from "mongodb"
require("dotenv").config()

interface User {
  _id: string
  name: string
  email: string | null
  wallet: string
<<<<<<< HEAD
=======
  mailingList: boolean
>>>>>>> tech-dev
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
