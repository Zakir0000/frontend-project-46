import genDiff from '../index.js';

describe('genDiff', () => {
  it('should compare JSON files and return differences', () => {
    const file1 = '__fixtures__/deepFile1.json';
    const file2 = '__fixtures__/deepFile2.json';
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

  it('should compare YAML files and return differences', () => {
    const file1 = '__fixtures__/deepFile1.yml';
    const file2 = '__fixtures__/deepFile2.yml';
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

  it('should handle files with no differences', () => {
    const file1 = '__fixtures__/identical.json';
    const file2 = '__fixtures__/identical.json';
    const expectedDiff = `{
    follow: false
    host: hexlet.io
    proxy: 123.234.53.22
    timeout: 50
}`; //  The expected output when files are identical

    const actualDiff = genDiff(file1, file2);
    expect(actualDiff).toEqual(expectedDiff);
  });

  it('should compare files with plain formatter and show difference', () => {
    const file1 = '__fixtures__/deepFile4.json';
    const file2 = '__fixtures__/deepFile3.json';
    const expectedDiff = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to [complex value]
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From 'too much' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
Property 'group4.default' was updated. From null to ''
Property 'group4.foo' was updated. From 0 to null
Property 'group4.isNested' was updated. From false to 'none'
Property 'group4.key' was added with value: false
Property 'group4.nest.bar' was updated. From '' to 0
Property 'group4.nest.isNested' was removed
Property 'group4.someKey' was added with value: true
Property 'group4.type' was updated. From 'bas' to 'bar'`;

    const actualDiff = genDiff(file1, file2, 'plain');
    expect(actualDiff).toEqual(expectedDiff);
  });
});
