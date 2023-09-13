import React from "react"
import { useState } from "react"
import { useEffect } from "react"

export default function About() {
  const [data, setData] = useState(null)
  const getGPTData = async () => {
    const prefix =
      "Act as a novelist writing a story about a team of superheroes and write a detailed long form story.  In between the story, include some paragraphs to describe each character in depth."
    const data = `We are a team building a project that lets you upload a character sheet and get back AI generated images so you can play with your friends more quickly.  Write us a secret internal culture story like this:  A Marvel style story formula about Narrow Arrow and the formation of the Productivity Pals, featuring Tippi, Danjo, Json, Somya and Aire, as well as their incredible AI supercar, named Grampa.  Use foreshadowing to imply the existence of an arch-nemesis working in the background named Scope Creeper who is always trying to waste everybody's time.
    Once upon a time, there was a brilliant inventor named Narrow Arrow. He had always been fascinated by the idea of using technology to make people's lives easier and more efficient. One day, while working on a project to automate the creation of character sheets for role-playing games, Narrow Arrow had a breakthrough. He realized that by using AI, he could create realistic, dynamic images of characters in a fraction of the time it would take to draw them by hand.`

    const gptResult = await fetch("/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ prefix, data }),
    })
    const result = await gptResult.json()
    console.log("result: ", result.output.text)
    return result.output.text
  }

  useEffect(() => {
    // !data &&
    getGPTData().then((data) => {
      console.log("data: ", data)
      setData((prev) => prev + data)
    })
  }, [])

  return (
    <div>
      <h1>About</h1>
      <p>{data ? data : "Loading a definitely true story..."}</p>
    </div>
  )
}
