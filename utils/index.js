const fs = require("fs");
const path = require("path");

module.exports = {
  checkFileExist(path) {
    return fs.existsSync(path);
  },
  createDir(src) {
    return fs.mkdirSync(src, { recursive: true });
  },
  readDir(path) {
    return fs.readdirSync(path, (err, files) => files);
  },
  copyFile(src, des) {
    return fs.copyFileSync(src, des, fs.constants.COPYFILE_EXCL);
  },
  copyFileArr(originPath, curPath, arr) {
    let extname = "";
    for (let i = 0; i < arr.length; i++) {
      extname = path.extname(arr[i]);
      this.copyFile(`${originPath}/${arr[i]}`, `${curPath}${extname}`);
    }
  },
};
