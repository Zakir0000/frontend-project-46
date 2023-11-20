import _ from "lodash";

function stringifyValue(value) {
  if (typeof value === "object" && value !== null) {
    return JSON.stringify(value, null, 2);
  }
  return String(value);
}

const jsonFormat = (diff) => stringifyValue(diff);

export default jsonFormat;
