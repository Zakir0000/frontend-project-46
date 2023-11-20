import { readFileSync } from "fs";
import path from "path";
import _ from "lodash";
import { parseJSON, parseYAML } from "./src/parsers.js";
import makeDiff from "./src/genDiff.js";
import mainDiff from "./src/formatters/index.js";

function getFileData(filePath) {
  const resolvePath = path.resolve(filePath);
  const fileContent = readFileSync(resolvePath, "utf8");
  const fileExtension = path.extname(resolvePath);
  return fileExtension === ".yml" || fileExtension === ".yaml"
    ? parseYAML(fileContent)
    : parseJSON(fileContent);
}

function genDiff(filePath1, filePath2, format) {
  const data1 = getFileData(filePath1);
  const data2 = getFileData(filePath2);
  const diff = makeDiff(data1, data2);
  return mainDiff(diff, format);
}

export default genDiff;
