# backend by danjo

new backend with socket integration: https://github.com/DnDnDiffusion/backend

> nodejs express and mongodb

frontend with sockets in context ready to be used: https://github.com/DnDnDiffusion/FrontendV2/tree/feature/sockets-context

> interested in seeing what parts of the front-end are connecting to the sockets?
>
> See the front-end above for relevant code in **utils/socketContext** and **components/GenerateButton.jsx**

## installation

1. npm install
<<<<<<< HEAD
2. create a .env with the proper variables
=======
2. create a .env with the proper variables (SD_ENDPOINT: https://stablediff-664a3266e9c5.herokuapp.com/generate-image)
>>>>>>> games-dev
3. reenable the cors object
4. npm run dev

## other stuff

These use auth, you can test a socket with
curl -H "apikey: testKey" http://localhost:4000
(or on railway at https://ceptor-backend.up.railway.app/)

You need to run the backend in conjunction with the frontend to get this to work. If it's all connected proper-like, you will see a console log on frontend after making curl req

## Now also has endpoints for user creation and lookup!

<<<<<<< HEAD
you can put `mongodb+srv://ceptorclub:dajfMXIwMzwM8ssI@ceptor.pgtoahq.mongodb.net/?retryWrites=true&w=majority` into mongodb compass and see the db
=======
you can put `mongodb+srv://verinta:BFWmxukoOsNdIx4x@ceptorclub.rq4oohp.mongodb.net/` into mongodb compass and see the db
>>>>>>> games-dev

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
