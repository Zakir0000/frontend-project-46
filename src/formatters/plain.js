import _ from 'lodash';
import path from 'path';

const plainFormat = (diff) => {
  function customJoin(arg1, arg2) {
    const joinedPath = path.join(arg1, arg2);
    const dottedPath = joinedPath.replace(path.sep, '.');
    return dottedPath;
  }

  const iter = (currentValue, ancestry) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const lines = currentValue.flatMap((obj) => {
      const name = obj.key;
      const newAncestry = customJoin(ancestry, name);
      if (obj.type === 'root') {
        const children = iter(obj.children, newAncestry);
        return `${children}`;
      }

      if (obj.type === 'nested') {
        const children = iter(obj.children, newAncestry);
        return `${children}`;
      }

      const complexVal = '[complex value]';

      function addSemicolons(inputString) {
        if (typeof inputString === 'string') {
          return `'${inputString}'`;
        }
        return inputString;
      }

      const getProperValue = (data) => {
        if (typeof data !== 'object') {
          return addSemicolons(data);
        }
        if (data === null) {
          return data;
        }
        return '[complex value]';
      };

      const generatePrefix = (object, ancty) => {
        if (object.type === 'added') {
          return `Property '${ancty}' was added with value: ${getProperValue(
            object.value,
          )}`;
        }

        if (object.type === 'deleted') {
          return `Property '${ancty}' was removed`;
        }

        if (object.type === 'changed' && typeof object.value !== 'object') {
          return [
            `Property '${ancty}' was updated. From ${getProperValue(
              object.value1,
            )} to ${getProperValue(object.value2)}`,
          ];
        }

        return [];
      };

      const prefix = generatePrefix(obj, newAncestry, complexVal);

      return Array.isArray(prefix)
        ? prefix.flatMap((line) => `${line}`)
        : `${prefix}`;
    });

    return [...lines].join('\n');
  };
  return iter(diff.children, '');
};

export default plainFormat;
