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
  return data;
};

const makePath = (node, parentPath = []) => [...parentPath, node].join('.');

const prefixByType = {
  root: (object, ancestry, iter) => {
    const children = object.children.flatMap((node) => iter(node, ancestry, iter));
    return children;
  },
  nested: (object, ancestry, iter) => {
    const children = object.children.flatMap((node) => iter(node, [...ancestry, object.key]));

    return children;
  },
  added: (object, ancestry) => `Property '${makePath(
    object.key,
    ancestry,
  )}' was added with value: ${getProperValue(object.value)}`,
  deleted: (object, ancestry) => `Property '${makePath(object.key, ancestry)}' was removed`,
  changed: (object, ancestry) => `Property '${makePath(
    object.key,
    ancestry,
  )}' was updated. From ${getProperValue(object.value1)} to ${getProperValue(
    object.value2,
  )}`,
  unchanged: () => [],
};

const plainFormat = (diff) => {
  const iter = (currentValue, path) => prefixByType[currentValue.type](currentValue, path, iter);

  return iter(diff, []).join('\n');
};

export default plainFormat;
