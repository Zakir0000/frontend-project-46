import makeDiff from './genDiff.js';
import mainDiff from './formatters/index.js';
import parseFile from './parsers.js';

function genDiff(filePath1, filePath2, format = 'stylish') {
  const data1 = parseFile(filePath1);
  const data2 = parseFile(filePath2);
  const diff = makeDiff(data1, data2);
  return mainDiff(diff, format);
}

export default genDiff;
