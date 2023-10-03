
import { genDiff } from "../src/genDiff";

const file1 = {
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
};
const file2 = {
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
};

test('gendiff', () => {

  expect(genDiff(file1, file2)).not.toBe(
    `{
      - follow: false
        host: hexlet.io
      - proxy: 123.234.53.22
      - timeout: 50
      + timeout: 20
      + verbose: true
      }`);
});