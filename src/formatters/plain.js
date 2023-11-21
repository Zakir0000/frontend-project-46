import _ from "lodash";
import path from "path";

const plainFormat = (diff) => {
  function stringifyValue(value) {
    if (_.isObject(value)) {
      return `{\n${Object.entries(value)
        .map(([key, val]) => `${key}: ${stringifyValue(val)}`)
        .join("")}`;
    }
    return `${value}`;
  }

  function customJoin(arg1, arg2) {
    const joinedPath = path.join(arg1, arg2);
    const dottedPath = joinedPath.replace(path.sep, ".");
    return dottedPath;
  }

  const iter = (currentValue, ancestry) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const lines = currentValue.flatMap((obj) => {
      const name = obj.key;
      const newAncestry = customJoin(ancestry, name);
      if (obj.type === "nested") {
        const children = iter(obj.children, newAncestry);
        return `${children}`;
      }

      const complexVal = "[complex value]";

      function addSemicolons(inputString) {
        if (typeof inputString === "string") {
          return `'${inputString}'`;
        } else {
          return inputString;
        }
      }

      const prefix =
        obj.type === "added"
          ? `Property '${newAncestry}' was added with value: ${
              typeof obj.value !== "object"
                ? addSemicolons(obj.value)
                : complexVal
            }`
          : obj.type === "deleted"
          ? `Property '${newAncestry}' was removed`
          : obj.type === "changed" && typeof obj.value !== "object"
          ? [
              `Property '${newAncestry}' was updated. From ${
                typeof obj.value1 !== "object"
                  ? stringifyValue(addSemicolons(obj.value1))
                  : complexVal
              } to ${stringifyValue(addSemicolons(obj.value2))}`,
            ]
          : [];

      return Array.isArray(prefix)
        ? prefix.flatMap((line) => `${line}`)
        : `${prefix}`;
    });

    return [...lines].join("\n");
  };
  return iter(diff, "");
};

export default plainFormat;
