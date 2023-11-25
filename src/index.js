import path from 'path';
import { readFileSync } from 'fs';
import buildFullTree from './genDiff.js';
import mainDiff from './formatters/index.js';
import parseFile from './parsers.js';

const getPathResolve = (resolvepath) => path.resolve(resolvepath);

const getFileContent = (filePath) => readFileSync(filePath, 'utf-8');

const getFileExtention = (resolvepath) => path.extname(resolvepath);

function genDiff(filePath1, filePath2, format = 'stylish') {
  const resolvePath1 = getPathResolve(filePath1);
  const resolvePath2 = getPathResolve(filePath2);
  const fileContent1 = getFileContent(resolvePath1);
  const fileContent2 = getFileContent(resolvePath2);
  const fileExtention1 = getFileExtention(resolvePath1);
  const fileExtention2 = getFileExtention(resolvePath2);
  const parsedData1 = parseFile(fileContent1, fileExtention1);
  const parsedData2 = parseFile(fileContent2, fileExtention2);
  const diff = buildFullTree(parsedData1, parsedData2);

  if (!parsedData1 || !parsedData2) {
    return null;
  }
  // console.log(JSON.stringify(diff, null, 2));
  // console.log(diff);
  return mainDiff(diff, format);
}

export default genDiff;
