import express, { Application, Request, Response } from "express";
import cors from "cors";
require("dotenv").config();
import ethers from "ethers";
const app: Application = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});
import { runMiddleware } from "./auth";
import { getImages } from "./utils/getImages";
import { getUser, saveUser } from "./utils/mongo";

app.use(cors()); // Open requests
app.use(express.json());
app.use(runMiddleware);

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

app.get("/user", async (req, res) => {
  const user = await getUser(req.query.wallet as string);
  user ? res.send(user) : res.send("user not found");
});

app.post("/user", async (req, res) => {
  const user = await saveUser(req.body);
  res.send(user);
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
    getImages(data).then((response: any) => {
      console.log("response from getImages", response);
      socket.emit("imageResponse", response); //using socket instead of IO to send to only the client that requested the images
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
