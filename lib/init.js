const path = require("path");
const chalk = require("chalk");
var fs = require("fs-extra");

const Utils = require("../utils/index");
const { loading } = require("../utils/loading");

function copy(src, des, projectName) {
  fs.copy(src, des, function (err) {
    if (err) {
      console.log("An error occured while copying the folder.");
      return console.error(err);
    }
    console.log(
      ` cd ${chalk.cyan(projectName)}\n for more info, check ${chalk.cyan(
        "wechat-miniprogram-cli -h"
      )}`
    );
  });
}

const init = async (projectName, targetDirectory) => {
  if (Utils.checkFileExist(`${targetDirectory}`)) {
    console.log(chalk.green(`${projectName}项目已存在`));
    return;
  }
  const src = `${path.join(__dirname, "..")}/boilerplate`;
  const des = `${targetDirectory}`;

  await loading(`downloading templates...`, copy, src, des, projectName);
};

module.exports = async function (projectName, options) {
  const cwd = process.cwd();
  const targetDirectory = path.join(cwd, projectName);
  init(projectName, targetDirectory);
};
