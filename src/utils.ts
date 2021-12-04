import path from "path";

export const resolveFileName = (fileName: string) => {
  const ext = path.extname(fileName);
  if (!ext) {
    return fileName;
  }
  return fileName.substr(0, fileName.indexOf(ext));
};

export const extMap: { [key: string]: string } = {
  js: "javascript",
  vue: "vue",
};
