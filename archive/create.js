const Creator = require("./Creator");
const path = require("path");
const fs = require("fs-extra");
const Inquirer = require("inquirer");

// 当前函数中可能存在很多异步操作，因此我们将其包装为 async
module.exports = async function (projectName, options) {
  // 获取当前工作目录
  const cwd = process.cwd();
  const targetDirectory = path.join(cwd, projectName);
  const creator = new Creator(projectName, targetDirectory);
  creator.create();
};
