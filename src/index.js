import { readFileSync } from "fs";
import path from "path";
import _ from "lodash";
import { parseJSON, parseYAML } from "./parsers.js";
import { makeDiff } from "./genDiff.js";
import mainDiff from "./formatters/index.js";

function getFileData(filePath) {
  const resolvePath = path.resolve(filePath);
  const fileContent = readFileSync(resolvePath, "utf8");
  const fileExtension = path.extname(resolvePath);
  return fileExtension === ".yml" || fileExtension === ".yaml"
    ? parseYAML(fileContent)
    : parseJSON(fileContent);
}

function stringifyValue(value) {
  if (typeof value === "object" && value !== null) {
    return JSON.stringify(value, null, 2);
  }
  return String(value);
}

export function genDiff(filePath1, filePath2, format) {
  const data1 = getFileData(filePath1);
  const data2 = getFileData(filePath2);
  const diff = makeDiff(data1, data2);
  return mainDiff(diff, format);
}
