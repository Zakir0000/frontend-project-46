#!/usr/bin/env node

import { Command } from 'commander';
import { genDiff } from '../src/genDiff.js'; // Assuming you have a genDiff module

const program = new Command();

program
  .name('gendiff')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>', 'first file to compare')
  .argument('<filepath2>', 'second file to compare')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const diff = genDiff(filepath1, filepath2, options.format);
    console.log(diff);
  })
  .parse();
