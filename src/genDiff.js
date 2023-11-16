/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import { parseJSON, parseYAML } from './parsers.js';

function getFileData(filePath) {
  const resolvePath = path.resolve(filePath);
  const fileContent = readFileSync(resolvePath, 'utf8');
  const fileExtension = path.extname(resolvePath);
  return fileExtension === '.yml' || fileExtension === '.yaml'
    ? parseYAML(fileContent)
    : parseJSON(fileContent);
}

function makeDiff(data1, data2) {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = _.union(keys1, keys2);
  const sortedUnionKeys = _.sortBy(unionKeys);

  function isPlainObject(obj) {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
  }

  const diff = sortedUnionKeys.map((key) => {
    if (isPlainObject(data1[key]) && isPlainObject(data2[key])) {
      const children = makeDiff(data1[key], data2[key]);
      return { key, type: 'nested', children };
    }
    if (!_.has(data1, key)) {
      return {
        key,
        type: 'added',
        value: data2[key],
      };
    }
    if (!_.has(data2, key)) {
      return {
        key,
        type: 'deleted',
        value: data1[key],
      };
    }
    if (data1[key] === data2[key]) {
      return {
        key,
        type: 'unchanged',
        value: data1[key],
      };
    }
    return {
      key,
      type: 'changed',
      value1: data1[key],
      value2: data2[key],
    };
  });
  return diff;
}

function stringifyValue(value) {
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value, null, 2);
  }
  return String(value);
}

export function genDiff(filePath1, filePath2) {
  const data1 = getFileData(filePath1);
  const data2 = getFileData(filePath2);
  return stringifyValue(makeDiff(data1, data2));
}
