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

      const generatePrefix = (object, ancty, complexV) => {
        if (object.type === 'added') {
          return `Property '${ancty}' was added with value: ${
            typeof object.value !== 'object'
              ? addSemicolons(object.value)
              : complexV
          }`;
        }

        if (object.type === 'deleted') {
          return `Property '${ancty}' was removed`;
        }

        if (object.type === 'changed' && typeof object.value !== 'object') {
          return [
            `Property '${ancty}' was updated. From ${
              object.value1 === null
                ? object.value1
                : typeof object.value1 === 'object'
                ? complexV
                : addSemicolons(object.value1)
            } to ${
              object.value2 === null
                ? object.value2
                : typeof object.value2 === 'object'
                ? complexV
                : addSemicolons(object.value2)
            }`,
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
  return iter(diff, '');
};

export default plainFormat;
