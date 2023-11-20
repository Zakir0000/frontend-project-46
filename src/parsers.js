import yaml from "js-yaml";

export function parseJSON(data) {
  return JSON.parse(data);
}

export function parseYAML(data) {
  return yaml.load(data);
}
