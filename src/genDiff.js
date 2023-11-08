/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import { readFileSync } from "fs";
import path from "path";
import { parseJSON, parseYAML } from "./parsers.js";
import _ from "lodash";

function getFileData(filePath) {
  const resolvePath = path.resolve(filePath);
  const fileContent = readFileSync(resolvePath, "utf8");
  const fileExtension = path.extname(resolvePath);
  return fileExtension === ".yml" || fileExtension === ".yaml"
    ? parseYAML(fileContent)
    : parseJSON(fileContent);
}

function generateDifferences(data1, data2) {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = _.uniq([...keys1, ...keys2]);
  const result = [];

  for (const key of allKeys.sort()) {
    const value1 = data1[key];
    const value2 = data2[key];

    if (value1 === undefined) {
      result.push(`  + ${key}: ${value2}`);
    } else if (value2 === undefined) {
      result.push(`  - ${key}: ${value1}`);
    } else if (value1 === value2) {
      result.push(`    ${key}: ${value1}`);
    } else {
      result.push(`  - ${key}: ${value1}`);
      result.push(`  + ${key}: ${value2}`);
    }
  }
  return result;
}

export function genDiff(filePath1, filePath2) {
  const data1 = getFileData(filePath1);
  const data2 = getFileData(filePath2);
  const differences = generateDifferences(data1, data2);

  return `{\n${differences.join("\n")}\n}`;
}
