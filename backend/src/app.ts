import express, { Application, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
require("dotenv").config();
import ethers from "ethers";
const app: Application = express();
const server = require("http").createServer(app);
const { ObjectId } = require("mongodb");
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});
import { runMiddleware } from "./auth"; //needs work
import { getImages } from "./utils/getImages";

import {
  getUserByWallet,
  saveUser,
  getAllUsers,
  saveCharacterData,
  getAllCharacters,
  getUserById,
  getCharacterById,
  getMostLikedSubmission,
  getSubmissions,
  voteForSubmission,
  saveSubmission,
  Submission,
  getAvailableDates,
  addAvailableDates,
  joinCampaign,
  Scheduler,
} from "./utils/mongo";

app.use(cors()); // Open requests
app.use(express.json());
app.use(bodyParser.json());
// app.use(runMiddleware);

//use middleware with socket.io to parse incoming requests with JSON payloads
io.use((socket: any, next: any) => {
  const token = socket.handshake.auth.token;
  // console.log("token in middleware", token);
  if (token !== process.env.API_KEY) {
    return next(new Error("unauthorized"));
  }
  socket.token = token;
  next();
});

//test socket
app.get("/", (req, res) => {
  io.emit("test", "test"); //using io sends to all clients
  res.send("test should have been successful");
});

//see user by wallet
app.get("/user/:wallet", async (req, res) => {
  const user = await getUserByWallet(req.params.wallet);
  user ? res.send(user) : res.send("user not found");
});

//see all users
app.get("/users", async (req, res) => {
  console.log("getting all users");
  const users = await getAllUsers();
  users ? res.send(users) : res.send("no users in database");
});

//see user by _id
app.get("/userData/:_id", async (req, res) => {
  console.log("getting a user by id");
  try {
    const userId = req.params._id;

    // Convert the string _id to ObjectId
    const userObjectId = new ObjectId(userId);

    const user = await getUserById(userObjectId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/COWSubmissions", async (req, res) => {
  console.log("getting all submissions");
  const submissions = await getSubmissions();
  res.send(submissions);
});

app.get("/mostLikedSubmission", async (req, res) => {
  console.log("getting most liked submission");
  const mostLikedSubmission = await getMostLikedSubmission();
  res.send(mostLikedSubmission);
});

app.post("/voteForSubmission", async (req, res) => {
  console.log("voting for submission");
  const vote = await voteForSubmission(
    req.body.tokenID as number,
    req.body.wallet as string
  );
  res.send(vote);
});

app.post("/submit", async (req, res) => {
  console.log("submitting submission");
  const addressOfCreator = req.body.addressOfCreator;
  console.log(addressOfCreator);
  const submission = await saveSubmission(req.body, addressOfCreator);
  res.send(submission);
});

//save user
app.post("/user", async (req, res) => {
  console.log("adding a user");
  const user = await saveUser(req.body);
  res.send(user);
});

//save character
//NEEDS WORK TO SAVE TO SPECIFIC USER
app.post("/characterData", async (req, res) => {
  const ownerWallet = req.body.ownerWallet;
  const characterData = req.body;
  const savedCharacterData = await saveCharacterData(
    characterData,
    ownerWallet
  );
  res.send(savedCharacterData);
});

//see all characters
app.get("/characterData", async (req, res) => {
  console.log("getting characters");
  const characters = await getAllCharacters();
  characters ? res.send(characters) : res.send("no characters in database");
});

//get character by id
app.get("/characterData/:_id", async (req, res) => {
  console.log("getting character by id");
  try {
    const characterId = req.params._id;

    // Convert the string _id to ObjectId
    const characterObjectId = new ObjectId(characterId);

    const character = await getCharacterById(characterObjectId);

    if (!character) {
      return res.status(404).json({ error: "Character not found" });
    }

    res.json(character);
  } catch (error) {
    console.error("Error fetching character data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//get available dates
app.get("/availability", async (req, res) => {
  console.log("getting available dates");
  const dates = await getAvailableDates();
  dates ? res.send(dates) : res.send("no available dates in database");
});

//add available dates
app.post("/availability", async (req, res) => {
  console.log("adding new dates");
  const gmWallet = req.body.gmWallet;
  const scheduler = req.body;
  const newDate = await addAvailableDates(scheduler, gmWallet);
  res.send(newDate);
});

//join a campaign, needs work
app.post("/campaign/:_id/join", async (req: Request, res: Response) => {
  const scheduler = req.body;
  const campaignId = req.params._id;
  const pcWallet = req.body.pcWallet;

  try {
    const updatedCampaignData: unknown = await joinCampaign(
      scheduler,
      campaignId,
      pcWallet
    );
    const updatedCampaign: Scheduler | Error = updatedCampaignData as
      | Scheduler
      | Error;

    if (updatedCampaign instanceof Error) {
      return res.status(400).json({ error: updatedCampaign.message });
    }

    return res.status(200).json(updatedCampaign);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


io.on("connection", (socket: any) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("test", (message: any) => {
    console.log("Message received:", message);
  });

  socket.on("imageRequest", (data: any) => {
    console.log("image request received", data);
    getImages(data).then((responseData: any) => {
      // console.log("response from getImages", response);
      // console.log("best practice", responseData.images.length)
      socket.emit("imageResponse", responseData); //using socket instead of IO to send to only the client that requested the images
    });
  });
});

//listen for mintevents
// const webSocketProvider = new ethers.providers.AlchemyWebSocketProvider(
//   process.env.ETH_NETWORK,
//   process.env.ALCHEMY_API_KEY
// )

server.listen(process.env.PORT, () =>
  console.log(`Server Running on ${process.env.PORT}`)
);
