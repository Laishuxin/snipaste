import fs from "fs/promises";
import { resolve } from "path";
import { Config } from "../../types";

export const traverse = async (config: Config) => {
  let { entry, base } = config;
  entry = resolve(base, entry);
  const dir = await fs.readdir(entry);
  const stats = await Promise.all(
    dir.map((file) => fs.stat(resolve(entry, file)))
  );
  const files: { entry: string; file: string }[] = [];
  stats.forEach((stat, index) => {
    stat.isFile() &&
      files.push({
        entry,
        file: dir[index],
      });
  });
  console.log(files);
};
