import _ from "lodash";

const stylishFormat = (diff, replacer = " ", spaceCount = 4) => {
  const iter = (currentValue, depth) => {
    const indent = " ".repeat(spaceCount * depth);

    const lines = currentValue.flatMap((node) => {
      if (node.type === "nested") {
        const children = iter(node.children, depth + 1);
        return [` ${indent} ${node.key}: {`, ...children, `${indent}   }`];
      }

      const prefix =
        node.type === "added"
          ? `+ ${node.key}: ${stringifyValue(node.value)}`
          : node.type === "deleted"
          ? `- ${node.key}: ${stringifyValue(node.value)}`
          : node.type === "unchanged"
          ? `  ${node.key}: ${stringifyValue(node.value)}`
          : node.type === "changed"
          ? [
              `- ${node.key}: ${stringifyValue(node.value1)}`,
              `+ ${node.key}: ${stringifyValue(node.value2)}`,
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

function stringifyValue(value) {
  if (_.isObject(value)) {
    return `{\n${Object.entries(value)
      .map(([key, val]) => `    ${key}: ${stringifyValue(val)}`)
      .join("\n")}\n  }`;
  }
  return value;
}
export default stylishFormat;
