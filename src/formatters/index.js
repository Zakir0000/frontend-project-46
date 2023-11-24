import stylishFormat from './stylish.js';
import plainFormat from './plain.js';
import jsonFormat from './json.js';

const mainDiff = (diff, format) => {
  switch (format) {
    case 'stylish':
      return stylishFormat(diff);
    case 'plain':
      return plainFormat(diff);
    case 'json':
      return jsonFormat(diff);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default mainDiff;
