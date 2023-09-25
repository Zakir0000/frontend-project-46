#!/usr/bin/env node

import { Option, program } from 'commander';

const command = (name1, name2) => {
  console.log(`Ahoya@!@!@!, ${name1}! and you to fluffyface ${name2}!!`);
}

program
  .action(command)
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .addOption(new Option('-V, --version', 'output usage information'))
  .option('-f, --format <type>', 'output format')
  .parse(process.argv);

// program.parse();