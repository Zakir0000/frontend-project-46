import _ from 'lodash';

const stylishFormat = (diff, replacer = ' ', spaceCount = 4) => {
  function stringifyValue(value, depth = 1) {
    const indentSize = depth * spaceCount;
    const indent = replacer.repeat(spaceCount * depth);
    const bracketIndent = replacer.repeat(indentSize - spaceCount);
    if (_.isObject(value)) {
      return `{\n${Object.entries(value)
        .map(
          ([key, val]) => `${indent}${key}: ${stringifyValue(val, depth + 1)}`,
        )
        .join('\n')}\n${bracketIndent}}`;
    }
    return value;
  }

  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = depth * spaceCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spaceCount);
    const lines = Object.values(currentValue).flatMap((obj) => {
      if (obj.type === 'nested') {
        const children = iter(obj.children, depth + 1);
        return `${currentIndent}${obj.key}: ${children}`;
      }

      const currentIndV2 = replacer.repeat(indentSize - 2);

      const generatePrefix = (object, prefixDepth) => {
        if (object.type === 'added') {
          return [
            `+ ${obj.key}: ${stringifyValue(obj.value, prefixDepth + 1)}`,
          ];
        }

        if (object.type === 'deleted') {
          return [
            `- ${obj.key}: ${stringifyValue(obj.value, prefixDepth + 1)}`,
          ];
        }

        if (object.type === 'unchanged') {
          return [
            `  ${obj.key}: ${stringifyValue(obj.value, prefixDepth + 1)}`,
          ];
        }

        if (object.type === 'changed') {
          return [
            `- ${obj.key}: ${stringifyValue(obj.value1, prefixDepth + 1)}`,
            `+ ${obj.key}: ${stringifyValue(obj.value2, prefixDepth + 1)}`,
          ];
        }
        return [];
      };

      const prefix = generatePrefix(obj, depth);

      return Array.isArray(prefix)
        ? prefix.map((line) => `${currentIndV2}${line}`)
        : `${currentIndV2}${prefix}`;
    });

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(diff, 1);
};

export default stylishFormat;
