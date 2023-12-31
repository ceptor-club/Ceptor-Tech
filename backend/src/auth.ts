import express, { Application, Request, Response } from "express"

//middleware to parse incoming requests with JSON payloads
export async function runMiddleware(req: Request, res: Response, next: any) {
  const token = req.headers.apikey
  // console.log("still getting here")
  if (token !== process.env.API_KEY) {
    console.log("invalid api key")
    res.status(401).json({ message: "unauthorized", status: 401 })
  } else {
    next()
  }
}
