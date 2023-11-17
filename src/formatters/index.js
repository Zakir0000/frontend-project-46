import stylishFormat from "./stylish.js";
import plainFormat from "./plain.js";

const mainDiff = (diff, format = "stylish") => {
  switch (format) {
    case "stylish":
      return stylishFormat(diff);
    case "plain":
      return plainFormat(diff);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default mainDiff;
