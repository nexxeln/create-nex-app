#!/usr/bin/env node

import path from "path";
import yargs from "yargs";
import fs from "fs-extra";

const args: any = yargs.option({
  name: { type: "string", demandOption: true, alias: "n" },
}).argv;

const { name } = args;

fs.mkdir(`./${name}`, (error: Error) => {
  if (error) {
    console.error("Could not create directory");
    process.exit(0);
  }

  const srcDir = `${path.resolve(__dirname)}/../template`;
  const destinationDir = `./${name}`;

  fs.copySync(srcDir, destinationDir);

  console.log(`Created ${name} successfully!`);
  console.log(`Next steps:`);
  console.log(`- cd ${name}`);
  console.log(`- npm install`);

  process.exit(0);
});
