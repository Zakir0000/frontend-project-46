import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const testCases = [
  ['deepFile1.json', 'deepFile2.json', undefined, 'stylish.txt'],
  ['deepFile1.yml', 'deepFile2.yml', 'stylish', 'stylish.txt'],
  ['deepFile1.json', 'deepFile2.json', 'plain', 'plain.txt'],
  ['deepFile1.yml', 'deepFile2.yml', 'json', 'json.json'],
];

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const fixturesPath = (fileName) => path.join(dirname, '..', '__fixtures__', fileName);

describe('genDiff', () => {
  test.each(testCases)(
    'should compare files and return differences using formatter %s, %s, %s',
    (file1, file2, formatter, expectedOutputFile) => {
      const filePath1 = fixturesPath(file1);
      const filePath2 = fixturesPath(file2);
      const expectedOutputPath = fixturesPath(expectedOutputFile);

      const actualDiff = genDiff(filePath1, filePath2, formatter);
      const expectedDiff = fs.readFileSync(expectedOutputPath, 'utf-8');

      expect(actualDiff).toEqual(expectedDiff);
    },
  );
});
