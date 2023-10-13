/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import { readFileSync } from 'fs';
import path from 'path';
import { parseJSON, parseYAML } from './parsers.js';

function getFileData(filePath) {
  const resolvePath = path.resolve(filePath);
  const fileContent = readFileSync(resolvePath, 'utf8');
  const fileExtension = path.extname(resolvePath);
  return fileExtension === '.yml' || fileExtension === '.yaml' ? parseYAML(fileContent) : parseJSON(fileContent);
}

function generateDifferences(data1, data2) {
  const keys = new Set([...Object.keys(data1), ...Object.keys(data2)]);
  const result = [];

  for (const key of [...keys].sort()) {
    if (data1[key] === undefined) {
      result.push(`  + ${key}: ${data2[key]}`);
    } else if (data2[key] === undefined) {
      result.push(`  - ${key}: ${data1[key]}`);
    } else if (data1[key] === data2[key]) {
      result.push(`    ${key}: ${data1[key]}`);
    } else {
      result.push(`  - ${key}: ${data1[key]}`);

      result.push(`  + ${key}: ${data2[key]}`);
    }
  }
  return result;
}

export function genDiff(filePath1, filePath2) {
  try {
    const data1 = getFileData(filePath1);
    const data2 = getFileData(filePath2);
    const differences = generateDifferences(data1, data2);

    return `{\n${differences.join('\n')}\n}`;
  } catch (error) {
    return `Error: ${error.message}`;
  }
}
