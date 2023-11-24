import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import path from 'path';

const getPathResolve = (resolvepath) => path.resolve(resolvepath);

const getFileContent = (filePath) => readFileSync(filePath, 'utf-8');

const parseFile = (filePath) => {
  const resolvePath = getPathResolve(filePath);
  const fileContent = getFileContent(resolvePath);
  const fileExtension = path.extname(resolvePath);
  switch (fileExtension) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yaml':
    case '.yml':
      return yaml.load(fileContent);
    default:
      return null;
  }
};

export default parseFile;
