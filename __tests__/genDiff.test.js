import genDiff from "../index.js";

describe("genDiff", () => {
  it("should compare JSON files and return differences", () => {
    const file1 = "__fixtures__/deepFile1.json";
    const file2 = "__fixtures__/deepFile2.json";
    const expectedDiff = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

    const actualDiff = genDiff(file1, file2);
    expect(actualDiff).toEqual(expectedDiff);
  });

  it("should compare YAML files and return differences", () => {
    const file1 = "__fixtures__/deepFile1.yml";
    const file2 = "__fixtures__/deepFile2.yml";
    const expectedDiff = `{
    common: {
      + follow: false
      - setting1: Valar
      + setting1: Value 1
      - setting2: 1000
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: Winter is coming
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: Jaime
      + baz: Ours is the Fury
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

    const actualDiff = genDiff(file1, file2);
    expect(actualDiff).toEqual(expectedDiff);
  });

  it("should handle files with no differences", () => {
    const file1 = "__fixtures__/identical.json";
    const file2 = "__fixtures__/identical.json";
    const expectedDiff = `{
    follow: false
    host: hexlet.io
    proxy: 123.234.53.22
    timeout: 50
}`; //  The expected output when files are identical

    const actualDiff = genDiff(file1, file2);
    expect(actualDiff).toEqual(expectedDiff);
  });
});
