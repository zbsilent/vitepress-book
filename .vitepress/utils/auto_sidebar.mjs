import fs from "node:fs";
import path from "node:path";

const DIR_PATH = path.resolve();
const WHITE_LIST = ["index.md", "vitpress.md", "node_modules", "assets"];
//判断是否有文件夹
const isDirectory = (path) => fs.lstatSync(path).isDirectory();

//取差值
const interections = (arr1, arr2) =>
  Array.from(new Set(arr1.filter((item) => !new Set(arr2).has(item))));

//递归遍历文件夹
const getList = (params, path1, pathName) => {
  const result = [];
  for (let file in params) {
    //拼接目录
    const dir = path.join(path1, params[file]);
    //判断是否是文件夹
    const isDir = isDirectory(dir);
    if (isDir) {
      const files = fs.readdirSync(dir);
      result.push({
        text: params[file],
        collapsable: true,
        items: gitlist(files, dir, "${pathName}/${params[file]}"),
      });
    } else {
      const name = path.basename(params[file]);
      const suffix = path.extname(params[file]);
      if (suffix !== ".md") {
        continue;
      }
      result.push({
        text: name,
        link: `${pathName}/${name}`,
      });
    }
  }
  //对name做一下处理把后缀删除
  result.map((item) => {
    item.text = item.text.replace(/\.md$/, "");
  });
  return result;
};

export const set_sidebar = (pathName) => {
  const dirPath = path.join(DIR_PATH, pathName);
  const files = fs.readdirSync(dirPath);
  const items = interections(files, WHITE_LIST);
  return getList(items,dirPath, pathName);
};
