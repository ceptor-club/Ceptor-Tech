import formidable from "formidable";
import pdf from "pdf-parse";
import { readFileSync } from "fs";

export default function handler(req, res) {
  // console.log("req in api: ", req.body);
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    // console.log("fields: ", fields);
    // console.log("files: ", typeof files.file, Object.keys(files.file), files.file.filepath);

    const dataBuffer = readFileSync(files.file.filepath);
    pdf(dataBuffer)
      .then((data) => {
        // console.log("data: ", data);
        //loop through data.text.split('\n') to get the data you need
        const playerData = {}; //could add better typing here ex. {name: string, class: string, xp: number}
        let featureCount = 0;
        data.text.split("\n").forEach((line, i) => {
          if (line == "") return;
          // console.log(`line ${i}: `, line); //there is a better way to do this madness
          if (i == 4) playerData.name = line;
          if (i == 6) {
            playerData.class = line.split(" ")[0];
            playerData.level = line.split(" ")[1];
          }
          if (i == 8) playerData.xp = line;
          if (i == 10) playerData.playerName = line;
          if (i == 12) playerData.race = line;
          if (i == 14) playerData.background = line;
          if (i == 22) playerData.str = [line];
          if (i == 23) playerData.str.push(line);
          if (i == 25) playerData.dex = [line];
          if (i == 26) playerData.dex.push(line);
          if (i == 28) playerData.con = [line];
          if (i == 29) playerData.con.push(line);
          if (i == 31) playerData.int = [line];
          if (i == 32) playerData.int.push(line);
          if (i == 34) playerData.wis = [line];
          if (i == 35) playerData.wis.push(line);
          if (i == 37) playerData.cha = [line];
          if (i == 38) playerData.cha.push(line);
          if (i == 39) playerData.profBonus = line;

          if (line.includes("Armor Worn")) {
            playerData.armorWorn = line.split("Armor Worn: ")[1];
          }
          if (line.includes("Feature")) {
            if (featureCount == 0) {
              playerData.feature = line.split("Feature: ")[1].split(".")[0];
              featureCount++;
            }
          }
          if (line.includes("Alignment")) {
            playerData.alignment = line.split("Alignment: ")[1].split(".")[0];
          }
        });
        res.status(200).json(playerData);
      })
      .catch((err) => {
        console.log("error: ", err);
        res.status(500).json({
          error: "Error parsing pdf, please try again and be sure you are using a .pdf file",
        });
      });
  });

  // res.status(200).json({ status: "Done" });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
