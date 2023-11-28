import path from 'path';
import { readFileSync } from 'fs';
import buildFullTree from './genDiff.js';
import mainDiff from './formatters/index.js';
import parseFile from './parsers.js';

const resolvePath = (filePath) => path.resolve(filePath);

const getFileContent = (filePath) => readFileSync(filePath, 'utf-8');

const getFileExtention = (filePath) => path.extname(filePath);

const parse = (filePath, extension) => parseFile(getFileContent(filePath), extension);

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const parsedData1 = parse(
    resolvePath(filePath1),
    getFileExtention(filePath1),
  );
  const parsedData2 = parse(
    resolvePath(filePath2),
    getFileExtention(filePath2),
  );
  const diff = buildFullTree(parsedData1, parsedData2);

  return mainDiff(diff, format);
};

export default genDiff;
