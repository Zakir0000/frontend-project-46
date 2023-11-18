import _ from "lodash";

const stylishFormat = (diff, replacer = " ", spaceCount = 4) => {
  const iter = (currentValue, depth) => {
    const indent = "   ".repeat(depth);
    const lines = currentValue.map((node) => {
      if (node.type === "nested") {
        const children = iter(node.children, depth + 1);
        return ` ${indent} ${node.key}: {\n${children}\n${indent}    }`;
      } else if (node.type === "changed") {
        return `${indent}- ${node.key}: ${node.value1}\n${indent}+ ${node.key}: ${node.value2}${indent}`;
      } else if (_.isObject(node.value)) {
        return ` ${indent} ${node.key}: ${JSON.stringify(node.value, null, 2)}`;
      }
      const prefix =
        node.type === "added"
          ? "+ "
          : node.type === "deleted"
          ? "- "
          : node.type === "unchanged"
          ? "  "
          : node.type === "changed"
          ? "  "
          : "  ";

      return `${indent}${prefix}${node.key}: ${node.value}`;
    });
    return lines.join("\n");
  };

  return iter(diff, 1);
};

export default stylishFormat;
