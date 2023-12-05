const getProperValue = (data) => {
  if (data === null) {
    return data;
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  if (typeof data === 'object') {
    return '[complex value]';
  }
  return String(data);
};

const makePath = (node, parentPath) => [...parentPath, node].join('.');

const prefixByType = {
  root: (obj, path, iter) => obj.children.flatMap((node) => iter(node, path, iter)),
  nested: (obj, path, iter) => obj.children.flatMap((node) => iter(node, [...path, obj.key])),
  added: (obj, path) => `Property '${makePath(
    obj.key,
    path,
  )}' was added with value: ${getProperValue(obj.value)}`,
  deleted: (obj, path) => `Property '${makePath(obj.key, path)}' was removed`,
  changed: (obj, path) => `Property '${makePath(obj.key, path)}' was updated. From ${getProperValue(
    obj.value1,
  )} to ${getProperValue(obj.value2)}`,
  unchanged: () => [],
};

const plainFormat = (diff) => {
  const iter = (currentValue, path) => prefixByType[currentValue.type](currentValue, path, iter);

  return iter(diff, []).join('\n');
};

export default plainFormat;
