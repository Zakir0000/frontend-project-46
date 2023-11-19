import _ from "lodash";

const stylishFormat = (diff, replacer = " ", spaceCount = 4) => {
  const iter = (currentValue, depth) => {
    const indent = replacer.repeat(spaceCount * depth);

    function stringifyValue(value, depth = 1) {
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
    }

    const lines = currentValue.flatMap((node) => {
      const nestedIntend = replacer.repeat((spaceCount + 2) * depth);
      if (node.type === "nested") {
        const children = iter(node.children, depth + 1);
        return [
          `${nestedIntend}${node.key}: {`,
          ...children,
          `${nestedIntend}}`,
        ];
      }

      const prefix =
        node.type === "added"
          ? `+ ${node.key}: ${stringifyValue(node.value, depth + 1)}`
          : node.type === "deleted"
          ? `- ${node.key}: ${stringifyValue(node.value, depth + 1)}`
          : node.type === "unchanged"
          ? `  ${node.key}: ${stringifyValue(node.value, depth + 1)}`
          : node.type === "changed"
          ? [
              `- ${node.key}: ${stringifyValue(node.value1, depth + 1)}`,
              `+ ${node.key}: ${stringifyValue(node.value2, depth + 1)}`,
            ]
          : "  ";

      return Array.isArray(prefix)
        ? prefix.map((line) => `${indent}${line}`)
        : `${indent}${prefix}`;
    });

    return lines;
  };

  return iter(diff, 1).join("\n");
};

export default stylishFormat;
