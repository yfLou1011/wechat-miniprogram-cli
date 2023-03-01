const fs = require("fs"); //引入nodejs fs文件模块
const { CONFIG } = require("./env");
const writeFile = (path, data) => {
  fs.writeFile(`${process.cwd()}${path}`, data, (err) => {
    if (err) throw err;
  });
};

const env = process.argv.splice(2)[0];
const ITEM = CONFIG[env];

let configString = "";
Object.keys(ITEM).forEach((key) => {
  configString += `export const ${key} = '${ITEM[key]}';\n`;
});
// 自动写入需要配置的config.js文件
writeFile("/utils/config.ts", configString);
