#!/usr/bin/env node

import { Option, program } from 'commander';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .addOption(new Option('-V, --version', 'output usage information'))


program.parse();