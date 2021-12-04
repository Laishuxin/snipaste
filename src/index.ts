import config from "../snipaste.config";
import { Config } from "../types";
import { config as defaultConfig } from "./default";
import fs from "fs";
import { resolve } from "path";
import Snipaste from "./core/Snipaste";

function resolveConfig(config: Partial<Config>): Config {
  const res = { ...defaultConfig, ...config };
  return res;
}

async function main() {
  const _config = resolveConfig(config);
  const entry = resolve(_config.base, _config.entry);
  const target = resolve(_config.base, _config.output.dir);

  if (!fs.existsSync(entry) || !fs.statSync(entry).isDirectory()) {
    throw new Error("Invalid entry");
  }

  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  const snipaste = new Snipaste(_config);
  const { files, dirs, parent } = await snipaste.traverse();
  const fileWithContent = await snipaste.resolveFiles(files);
  snipaste.export(fileWithContent, { key: parent });
  snipaste.resolveDirs(dirs);
}

main();
