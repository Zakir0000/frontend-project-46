import { genDiff } from '../src/genDiff.js';

describe('genDiff', () => {
  it('should compare JSON files and return differences', () => {
    const file1 = '__fixtures__/file1.json';
    const file2 = '__fixtures__/file2.json';
    const expectedDiff = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

    const actualDiff = genDiff(file1, file2);
    expect(actualDiff).toEqual(expectedDiff);
  });

  it('should compare YAML files and return differences', () => {
    const file1 = '__fixtures__/filepath1.yml';
    const file2 = '__fixtures__/filepath2.yml';
    const expectedDiff = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

    const actualDiff = genDiff(file1, file2);
    expect(actualDiff).toEqual(expectedDiff);
  });

});


