import genDiff from '../index.js';
import {
  plainOutput,
  stylishOutput,
  withNoDiff,
  jsonOutput,
} from '../__fixtures__/outputForTests.js';

const testCases = [
  [
    '__fixtures__/deepFile1.json',
    '__fixtures__/deepFile2.json',
    stylishOutput,
    'stylish',
  ],
  [
    '__fixtures__/deepFile1.yml',
    '__fixtures__/deepFile2.yml',
    stylishOutput,
    'stylish',
  ],
  [
    '__fixtures__/deepFile1.json',
    '__fixtures__/deepFile1.json',
    withNoDiff,
    'stylish',
  ],
  [
    '__fixtures__/deepFile1.json',
    '__fixtures__/deepFile2.json',
    plainOutput,
    'plain',
  ],
  [
    '__fixtures__/deepFile1.yml',
    '__fixtures__/deepFile2.yml',
    jsonOutput,
    'json',
  ],
];

describe('genDiff', () => {
  test.each(testCases)(
    'should compare files and return differences using formatter %s',
    (file1, file2, expectedDiff, formatter) => {
      const actualDiff = genDiff(file1, file2, formatter);
      expect(actualDiff).toEqual(expectedDiff);
    },
  );
});
