# Project "Difference calculator"

### Hexlet tests and linter status:

[![Actions Status](https://github.com/Zakir0000/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Zakir0000/frontend-project-46/actions)

### My tests status:

[![Actions Status](https://github.com/Zakir0000/frontend-project-46/workflows/CI/badge.svg)](https://github.com/Zakir0000/frontend-project-46/actions)

[![Maintainability](https://api.codeclimate.com/v1/badges/795803f5227e24ba10bd/maintainability)](https://codeclimate.com/github/Zakir0000/frontend-project-46/maintainability)

## About

**"Difference calculator"** is a program that determines the difference between two data structures. This is a popular task, for which there are many online services, for example https://www.jsondiff.com. A similar mechanism is used when outputting tests or when automatically tracking changes in configuration files.

Features of the utility:

- Supports various input formats: yaml, json;
- Report generation as plain text, stylish and json.

Examples of use:

1. <a href="#default-comparison-flat-json">"Comparison of flat files (JSON)"</a>
2. <a href="#default-comparison-flat-yml">"Comparison of flat files (YAML)"</a>

## CLI

```shell
# Runs npm-publish with flag (--dry-run)
make publish

# Runs Eslint against source code for quality
make lint

# Runs Jest
make test

# Runs Jest in code coverage mode
make test-coverage

# Runs Jest in watch mode
make watch
```

<h2 id="default-comparison-flat-json">Comparison of flat files (JSON)</h2>
A simple comparison of 2 files with JSON extension without specifying the output data format.

[![asciicast](https://asciinema.org/a/J3V7LAnSXpRGKDNjc4vY8kIgB.svg)](https://asciinema.org/a/J3V7LAnSXpRGKDNjc4vY8kIgB)

<h2 id="default-comparison-flat-yaml">Comparison of flat files (YAML)</h2>
A simple comparison of 2 files with YAML extension without specifying the output data format.

[![asciicast](https://asciinema.org/a/1AE0I0aKMdMDzkJtujqqIzuSW.svg)](https://asciinema.org/a/1AE0I0aKMdMDzkJtujqqIzuSW)

[def]: https://github.com/Zakir0000/frontend-project-46/actions
