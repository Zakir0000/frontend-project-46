/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import { readFileSync } from "fs";
import path from "path";
import _ from "lodash";
import { parseJSON, parseYAML } from "./parsers.js";
import { type } from "os";

function getFileData(filePath) {
  const resolvePath = path.resolve(filePath);
  const fileContent = readFileSync(resolvePath, "utf8");
  const fileExtension = path.extname(resolvePath);
  return fileExtension === ".yml" || fileExtension === ".yaml"
    ? parseYAML(fileContent)
    : parseJSON(fileContent);
}

function buildAST(obj, key = null) {
  if (Array.isArray(obj)) {
    return {
      type: "array",
      key,
      children: obj.map((item, index) => buildAST(item, index.toString())),
    };
  } else if (typeof obj === "object" && obj !== null) {
    return {
      type: "object",
      key,
      children: Object.keys(obj).map((childKey) =>
        buildAST(obj[childKey], childKey)
      ),
    };
  } else {
    return {
      type: "primitive",
      key,
      value: obj,
    };
  }
}

function generateDiff(ast1, ast2) {
  const diff = [];

  const findNodeByKey = (key, nodes) => nodes.find((node) => node.key === key);

  const compareNodes = (node1, node2) => {
    // If a node is missing in one of the trees, mark it as added or removed
    if (!node1) {
      diff.push({ type: "added", key: node2.key, value: node2.value });
    } else if (!node2) {
      diff.push({ type: "removed", key: node1.key, value: node1.value });
    } else {
      // If both nodes exist, compare their values and children
      if (node1.children && node2.children) {
        node1.children.forEach((child1) => {
          const child2 = findNodeByKey(child1.key, node2.children);
          compareNodes(child1, child2);
        });

        // Identify added children
        node2.children.forEach((child2) => {
          const child1 = findNodeByKey(child2.key, node1.children);
          if (!child1) {
            diff.push({ type: "added", key: child2.key, value: child2.value });
          }
        });
      } else {
        // Handle the case where one of the nodes doesn't have chidren property
        if (node1.children) {
          // Only node1 has children
          node1.children.forEach((child1) => {
            diff.push({
              type: "removed",
              key: child1.key,
              value: child1.value,
            });
          });
        } else if (node2.children) {
          // Only node2 has children
          node2.children.forEach((child2) => {
            diff.push({ type: "added", key: child2.key, value: child2.value });
          });
        }
      }
    }
  };

  compareNodes(ast1, ast2);

  return diff;
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

  const ast1 = buildAST(data1);
  const ast2 = buildAST(data2);
  return generateDiff(ast1, ast2);
}
