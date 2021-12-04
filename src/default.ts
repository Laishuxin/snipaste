import { Config } from "../types";
import { resolve } from "path";
import { vscodeGenerator, vscodeResolver } from "./resolver/vscode";

export const resolver = vscodeResolver;
export const generator = vscodeGenerator;

export const config: Config = {
  base: resolve(__dirname, "../"),
  entry: "template",
  output: {
    dir: resolve(__dirname, "../.vscode"),
  },

  naming: {
    template: "sutils:",
    js: "js:",
    vue: "vue2:",
  },
  ext: ".code-snippets",
};
