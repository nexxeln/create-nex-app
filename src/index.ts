#!/usr/bin/env node

import path from "path";
import yargs from "yargs";
import fs from "fs-extra";

import { getPkgManager } from "./helpers/get-pkg-manager";

const args: any = yargs.option({
  name: { type: "string", demandOption: true, alias: "n" },
}).argv;

const { name } = args;

fs.mkdir(`./${name}`, (error: Error) => {
  if (error) {
    console.error("Could not create directory!");
    process.exit(0);
  }

  const pkgManager = getPkgManager();

  const srcDir = `${path.resolve(__dirname)}/../template`;
  const destinationDir = `./${name}`;

  fs.copySync(srcDir, destinationDir);

  console.log(`using ${pkgManager} to install dependencies`);

  console.log(`Created ${name} successfully!`);
  console.log(`Next steps:`);
  console.log(`- cd ${name}`);
  console.log(`- ${pkgManager} install`);

  if (pkgManager === "yarn") {
    console.log(`- yarn dev`);
  } else if (pkgManager === "pnpm") {
    console.log(`- pnpm dev`);
  } else {
    console.log(`- npm run dev`);
  }

  process.exit(0);
});
