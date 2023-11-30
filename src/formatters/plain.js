import path from "path";

const customJoin = (arg1, arg2) => {
  const joinedPath = path.join(arg1, arg2);
  const dottedPath = joinedPath.replace(path.sep, ".");
  return dottedPath;
};

const addSemicolons = (inputString) => {
  if (typeof inputString === "string") {
    return `'${inputString}'`;
  }
  return inputString;
};
const getProperValue = (data) => {
  if (typeof data !== "object") {
    return addSemicolons(data);
  }
  if (data === null) {
    return data;
  }
  return "[complex value]";
};

const plainFormat = (diff) => {
  const prefixByType = {
    root: (object, ancestry) => {
      const name = object.key;
      const newAncestry = customJoin(ancestry, name);
      const children = object.children.flatMap((node) =>
        prefixByType[node.type](node, newAncestry)
      );
      return children.join("\n");
    },
    nested: (object, ancestry) => {
      const name = object.key;
      const newAncestry = customJoin(ancestry, name);
      const children = object.children.flatMap((node) =>
        prefixByType[node.type](node, newAncestry)
      );
      return children.join("\n");
    },
    added: (object, ancestry) =>
      ancestry !== "."
        ? `Property '${ancestry}.${
            object.key
          }' was added with value: ${getProperValue(object.value)}`
        : `Property '${object.key}' was added with value: ${getProperValue(
            object.value
          )}`,
    deleted: (object, ancestry) =>
      ancestry !== "."
        ? `Property '${ancestry}.${object.key}' was removed`
        : `Property '${object.key}' was removed`,
    changed: (object, ancestry) =>
      `Property '${ancestry}.${object.key}' was updated. From ${getProperValue(
        object.value1
      )} to ${getProperValue(object.value2)}`,
    unchanged: () => [],
  };

  const iter = (currentValue, ancestry) =>
    prefixByType[currentValue.type](currentValue, ancestry);
  return iter(diff, "");
};

export default plainFormat;
