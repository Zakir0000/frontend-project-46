# Project "Difference calculator"

### Hexlet tests and linter status:

[![Actions Status](https://github.com/Zakir0000/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Zakir0000/frontend-project-46/actions)

### My tests status:

[![Actions Status](https://github.com/Zakir0000/frontend-project-46/workflows/CI/badge.svg)](https://github.com/Zakir0000/frontend-project-46/actions)

[![Maintainability](https://api.codeclimate.com/v1/badges/795803f5227e24ba10bd/maintainability)](https://codeclimate.com/github/Zakir0000/frontend-project-46/maintainability)

### Test coverage:

[![Test Coverage](https://api.codeclimate.com/v1/badges/795803f5227e24ba10bd/test_coverage)](https://codeclimate.com/github/Zakir0000/frontend-project-46/test_coverage)

## About

**"Difference calculator"** is a program that determines the difference between two data structures. This is a popular task, for which there are many online services, for example https://www.jsondiff.com. A similar mechanism is used when outputting tests or when automatically tracking changes in configuration files.

Features of the utility:

- Supports various input formats: yaml, json;
- Report generation as plain text, stylish and json.

Examples of use:

1. <a href="#default-comparison-flat-json">"Comparison of flat files (JSON)"</a>
2. <a href="#default-comparison-flat-yml">"Comparison of flat files (YAML)"</a>
3. <a href="#default-comparison-nested-json">"Comparison of nested files (YAML)"</a>
4. <a href="#plain-comparison-nested-json">"Comparison with 'plain' format two nested files(JSON)"</a>
5. <a href="#json-comparison-nested-json">"Comparison with 'json' format two nested files(JSON)"</a>

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

[![asciicast](https://asciinema.org/a/AsJ1M4lFdvI9kNsCraTKbMcfj.svg)](https://asciinema.org/a/AsJ1M4lFdvI9kNsCraTKbMcfj)

<h2 id="default-comparison-flat-yaml">Comparison of flat files (YAML)</h2>
A simple comparison of 2 files with YAML extension without specifying the output data format.

[![asciicast](https://asciinema.org/a/1AE0I0aKMdMDzkJtujqqIzuSW.svg)](https://asciinema.org/a/1AE0I0aKMdMDzkJtujqqIzuSW)

[def]: https://github.com/Zakir0000/frontend-project-46/actions

<h2 id="default-comparison-nested-json">Comparison of nested files (JSON)</h2>
A simple comparison of 2 nested files with JSON extension without specifying the output data format.

[![asciicast](https://asciinema.org/a/OoUnwJPm820nCHYklnDMr479d.svg)](https://asciinema.org/a/OoUnwJPm820nCHYklnDMr479d)

<h2 id="plain-comparison-nested-json">Comparison of nested files with "plain" format (JSON)</h2>

Comparison of 2 nested json files with the output data format 'plain'.
[![asciicast](https://asciinema.org/a/wltru1dRVRgnHHNYNXgM0VbaK.svg)](https://asciinema.org/a/wltru1dRVRgnHHNYNXgM0VbaK)

<h2 id="json-comparison-nested-json">Comparison of nested files with "json" format (JSON)</h2>

Comparison of 2 nested json files with the output data format 'json'.
[![asciicast](https://asciinema.org/a/pdDqeABYfg0ARrnAwBYB0mrvx.svg)](https://asciinema.org/a/pdDqeABYfg0ARrnAwBYB0mrvx)
