import path from "path";
import { extMap, resolveFileName } from "../utils";

export const vscodeResolver = (
  fileName: string,
  content: string,
  prefix: string = "",
  suffix: string = ""
): string => {
  const ext = path.extname(fileName);
  fileName = resolveFileName(fileName);
  let scope: string = "";

  if (ext && extMap[ext.slice(1)]) {
    scope = `\t"scope": "${extMap[ext.slice(1)]}",`;
  }

  prefix = `${prefix}${fileName}${suffix}`;
  const res = `"${prefix}":{
${scope}
\t"prefix": "${prefix}",
\t"body": ${JSON.stringify(content)}
}`;

  return res;
};

export const vscodeGenerator = (normalizeContents: string[]): string => {
  normalizeContents = normalizeContents.map((c, index) =>
    index !== normalizeContents.length - 1 ? `${c},\n` : c
  );
  return JSON.stringify(
    JSON.parse(`{\n${normalizeContents.join("")}\n}`),
    null,
    2
  );
};
