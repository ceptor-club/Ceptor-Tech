# Ceptor Club Tech Team - Constellation - A CHAINLINK HACKATHON | NOV 8 – DEC 10

Todo:
- [x] Provide a quick start guide for devs and judges
- [x] Explain the 3 teams (Art + Tech + Games) and how they work together
- [ ] High level overview of Ceptor Club and our goal for this hackathon / future
- [ ] Onboard all 3 teams to this repo
- [ ] Add Art, Tech, and Games pages to the navbar and front-end.

### We are providing a unified codebase for all 3 teams and clear documentation for the judges:

Each team will have their own branch to show their individual contributions to this codebase. The main branch will be the final product.

Each team will have their own narrative, demo video, internal page and readme linked below.

> As Team Tech, we will oversee the technical polish and powerfully use Chainlink’s flagship services.  We developed a login flow with monetization, crosschain compatiblity, and access control.  We use Price Feeds, Automation, Functions, VRF, and CCIP.  Tippi wants to prepare Ceptor Club to launch a BETA in Q1 next year and see some revenue.  

## Ceptor Tech is:

- Tippi (Product Owner and CCID/CCIP Developer)
- Eman (Chainlink Developer Expert -- Functions, Automation, VRF)
- Alica (PM and Designer)
- Lena (Web3 Fullstack with a heart of gold)
- Aire (Front-end support)

### Ceptor Art (Artour)

> Team Art (Artour) will support overall branding and help with our demo videos/team narratives, in addition to creating an end-to-end session zero experience following character creation. They are making sure our app and images generation looks good.

- Michael Finney
- Melinda McClimans
- Spencer Kinney
- leomofthings.eth (Front End Development)

Link to readme:

### Ceptor Games

> Team Games will make sure our overall project is fun and usable.  They are building a couple small games and activities: Improved character creation and fun quiz, rollable 3D Big Dice, AI Prompt Battler, to make our app more “sticky.”

- Sam Yeh
- Jason A
- Vince
- Alan Barry
- Nadia

Link to readme:

# Getting Started 

1. Clone this directory

   `git clone https://github.com/ceptor-club/Ceptor-Tech.git`

2. It will create three folders: `backend` and `frontend` (and `smart_contracts`).

## 🧑‍💻 Let's Setup Frontend First 

1. Go to frontend folder

   `cd frontend`

2. Install dependencies

   `npm install`

3. Clone .env.sample to .env

   `cp .env.sample .env`

4. Setting up .env variables 

   - Setting up Network and Chain Id
      
     - `NEXT_PUBLIC_NETWORK=goerli`
     - `NEXT_PUBLIC_CHAIN_ID=5`

   - Setting up Alchemy API Key

     - Go to [Alchemy Dashboard](https://dashboard.alchemy.com/) and create an account(if you don't have one already)
     - Create a new project based on your `NEXT_PUBLIC_NETWORK` variable and copy the API Key
     - Paste the API Key in `.env` file as `NEXT_PUBLIC_ALCHEMY_KEY=https://eth-goerli.g.alchemy.com/v2/4nxF5nQMK20uGJinU_sample`

   - Setting up WALLETCONNECT_PROJECT_ID for wallet authentication -

     - Go to [WalletConnect Dashboard](https://cloud.walletconnect.com/app) and create an account(if you don't have one already)
     - Create a new project and copy the API Key
     - Paste the API Key in `.env` file as `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=f88d2c49_sample`
     
   - Setting up OPENAI_API_KEY (optional)

     - Go to [OpenAI Dashboard](https://platform.openai.com/account/api-keys) and create an account(if you don't have one already)
     - Create a new project and copy the API Key
     - Paste the API Key in `.env` file as `NEXT_PUBLIC_OPENAI_API_KEY=sk-<34f34qw_sample>`

   - Setting up NFT.storage api for storing images on IPFS

     - Go to [NFT.storage Dashboard](https://nft.storage/) and create an account(if you don't have one already)
     - Create a new project and copy the API Key
     - Paste the API Key in `.env` file as `NEXT_PUBLIC_NFT_STORAGE=eyJhbGciOiJIUzI1NiIsI_sample`

5. Run the frontend
   
      `npm run dev`

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result and enjoy!

    `Need to setup backend now to see the full functionality of the frontend, if already setup then skip to step 7`

7. Check that the back-end API is functioning by uploading the fastcharacter.com sheet pdf and generating an image.


## 🖥️ Let's Setup Backend

1. Go to Backend folder

   `cd backend`

2. Install all the dependencies

   `npm install`

3. Clone .env.example to .env

   `cp .env.example .env`

4. Setting up .env variables
 
   - For ALCHEMY_API_KEY use the same key as in frontend
   - Setup API_KEY="testKey" for Socket io connections
   - Setup DB_CONN_STRING=mongodb+srv://verinta:BFWmxukoOsNdIx4x@ceptorclub.rq4oohp.mongodb.net/ for db connection

5. Renable CORS object 

6. Run the backend

   `npm run dev`

# Learn More 

## **🛠️ MongoDB Setup: Endpoints for user creation and lookup!**

Put the connection string: `mongodb+srv://ceptorclub:dajfMXIwMzwM8ssI@ceptor.pgtoahq.mongodb.net/?retryWrites=true&w=majority` into mongodb compass and see the db

GET /user?wallet=<wallet0x> will give you the user
POST /user with

```
{
name: "blap",
email: "sldkfjh@klfj.com",
wallet: "0x12373fn...",
whatever: "else we want to save about users as we go (no, not images)"
}
```