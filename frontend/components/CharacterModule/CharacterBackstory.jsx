import React from "react"
import { useState } from "react"
import { CONSTANTS } from "../../utils/CONSTANTS"

export const CharacterBackstory = ({ pdfData }) => {
  const [backstory, setBackstory] = useState("")
  const [generating, setGenerating] = useState(false)

  const generateBackstory = async () => {
    setGenerating(true)
    delete pdfData.playerName
    delete pdfData.level
    delete pdfData.xp
    delete pdfData.profBonus

    console.log("generating backstory from pdfData: ", pdfData)
    const gptResult = await fetch("/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        prefix: CONSTANTS.gptPrefixDescription,
        data: pdfData,
      }),
    })
    const result = await gptResult.json()
    console.log("result: ", result.output.text)
    setBackstory(result.output.text)
    setGenerating(false)
  }

  return (
    <div className=" bg-orange-900 min-h-fit p-20 w-full">
      <h3 className="text-2xl">Generate a backstory!</h3>
      {backstory ? (
        <p className="p-4 text-left">{backstory}</p>
      ) : generating ? (
        <p>Generating...</p>
      ) : pdfData ? (
        <button className="rounded-full bg-yellow-600 p-2 text-black" onClick={generateBackstory}>
          Click here
        </button>
      ) : (
        <p>Upload a character sheet to generate a backstory!</p>
      )}
      {/* <textarea value={JSON.stringify(pdfData)} className="min-h-[300px] w-full bg-transparent"></textarea> */}
    </div>
  )
}
