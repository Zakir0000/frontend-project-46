import _ from "lodash";

const stylishFormat = (diff) => {
  const spaceCount = 4;
  const replacer = " ";

  const stringifyValue = (value, depth = 1) => {
    const indentSize = depth * spaceCount;
    const indent = replacer.repeat(spaceCount * depth);
    const bracketIndent = replacer.repeat(indentSize - spaceCount);
    if (_.isObject(value)) {
      return `{\n${Object.entries(value)
        .map(
          ([key, val]) => `${indent}${key}: ${stringifyValue(val, depth + 1)}`
        )
        .join("\n")}\n${bracketIndent}}`;
    }
    return value;
  };

  const currentIndent = (depth) => replacer.repeat(depth * spaceCount - 2);

  const prefixByType = {
    added: (object, prefixDepth) =>
      `${currentIndent(prefixDepth)}+ ${object.key}: ${stringifyValue(
        object.value,
        prefixDepth + 1
      )}`,
    deleted: (object, prefixDepth) =>
      `${currentIndent(prefixDepth)}- ${object.key}: ${stringifyValue(
        object.value,
        prefixDepth + 1
      )}`,
    unchanged: (object, prefixDepth) =>
      `${currentIndent(prefixDepth)}  ${object.key}: ${stringifyValue(
        object.value,
        prefixDepth + 1
      )}`,
    changed: (object, prefixDepth) => [
      `${currentIndent(prefixDepth)}- ${object.key}: ${stringifyValue(
        object.value1,
        prefixDepth + 1
      )}`,
      `${currentIndent(prefixDepth)}+ ${object.key}: ${stringifyValue(
        object.value2,
        prefixDepth + 1
      )}`,
    ],
    nested: (object, prefixDepth) => {
      const output = object.children.flatMap((node) =>
        prefixByType[node.type](node, prefixDepth + 1)
      );
      return `${currentIndent(prefixDepth)}  ${object.key}: {\n${output.join(
        "\n"
      )}\n${currentIndent(prefixDepth)}  }`;
    },
    root: (object, prefixDepth) => {
      const output = object.children.flatMap((node) =>
        prefixByType[node.type](node, prefixDepth + 1)
      );
      return `{\n${output.join("\n")}\n}`;
    },
  };

  const iter = (currentValue, depth) =>
    prefixByType[currentValue.type](currentValue, depth);
  return iter(diff, 0);
};

export default stylishFormat;
