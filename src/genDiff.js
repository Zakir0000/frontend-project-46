/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import { readFileSync } from 'fs';
import path from 'path';

export function genDiff(filePath1, filePath2) {
  try {
    const resolvePath1 = path.resolve(filePath1);
    const resolvePath2 = path.resolve(filePath2);

    const file1 = readFileSync(resolvePath1, 'utf8');
    const file2 = readFileSync(resolvePath2, 'utf8');
    const data1 = JSON.parse(file1);
    const data2 = JSON.parse(file2);

    const keys = new Set([...Object.keys(data1), ...Object.keys(data2)]);
    const result = [];

    for (const key of [...keys].sort()) {
      if (data1[key] === undefined) {
        result.push(`+ ${key}: ${data2[key]}`);
      } else if (data2[key] === undefined) {
        result.push(`- ${key}: ${data1[key]}`);
      } else if (data1[key] === data2[key]) {
        result.push(`  ${key}: ${data1[key]}`);
      } else {
        result.push(`- ${key}: ${data1[key]}`);
        result.push(`+ ${key}: ${data2[key]}`);
      }
    }

    return `{\n${result.join('\n')}\n}`;
  } catch (error) {
    return `Error: ${error.message}`;
  }
}
