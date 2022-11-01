import express, { Application, Request, Response } from "express";
const cors = require("cors");

const app: Application = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function findOverlappingStr(src: string, pattern: string) {
  const regx = new RegExp(`([${pattern.split("")}])`, "g");

  let filteredStr = src.match(regx);
  let focusPos = 0,
    i = 0,
    flag = false,
    duplicateStr = "";

  if (filteredStr) {
    while (focusPos < filteredStr.length && i < pattern.length) {
      debugger;
      if (filteredStr[focusPos] === pattern[i]) {
        duplicateStr += pattern[i];
        i++;
        focusPos++;
        flag = true;
      } else {
        if (filteredStr.length < pattern.length) {
          if (flag) i++;
          else focusPos++;
        } else focusPos++;
      }
    }
  }
  return duplicateStr;
}

app.post(
  "/api/v1/overlapping",
  async (req: Request, res: Response): Promise<Response> => {
    const { src, pattern } = req.body.data;
    const rightRes = findOverlappingStr(src, pattern),
      reverseRes = findOverlappingStr(pattern, src);
    const resStr = rightRes.length > reverseRes.length ? rightRes : reverseRes;
    return res.status(200).send({
      overlappingCnt: resStr.length,
      duplicateStr: resStr,
    });
  }
);

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${error}`);
}
