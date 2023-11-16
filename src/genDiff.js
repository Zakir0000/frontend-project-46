/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import { readFileSync } from "fs";
import path from "path";
import _ from "lodash";
import { parseJSON, parseYAML } from "./parsers.js";

function getFileData(filePath) {
  const resolvePath = path.resolve(filePath);
  const fileContent = readFileSync(resolvePath, "utf8");
  const fileExtension = path.extname(resolvePath);
  return fileExtension === ".yml" || fileExtension === ".yaml"
    ? parseYAML(fileContent)
    : parseJSON(fileContent);
}

function buildAST(data) {
  if (_.isObject(data)) {
    const keys = Object.keys(data);
    const children = keys.map((key) => {
      const type = _.isObject(data[key]) ? "tag-internal" : "leaf";
      const child = {};
      if (type === "tag-internal") {
        child.name = key;
        child.type = type;
      } else if (type === "leaf") {
        child.name = key;
        child.type = type;
        child.value = data[key];
      }
      child.children = buildAST(data[key]);
      return child;
    });
    return children;
  }
}

function stringifyValue(value) {
  if (typeof value === "object" && value !== null) {
    return JSON.stringify(value, null, 2);
  } else {
    return String(value);
  }
}

export function genDiff(filePath1, filePath2) {
  const data1 = getFileData(filePath1);
  const data2 = getFileData(filePath2);
  console.log(stringifyValue(buildAST(data1)));
}
