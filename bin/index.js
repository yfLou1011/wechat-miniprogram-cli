#!/usr/bin/env node
const { program } = require("commander");
const chalk = require("chalk");
const fs = require("fs");

let projectPath = process.cwd();
let { appid } = require(`${projectPath}/project.config.json`);
const Utils = require("../utils/index");

// 查看版本号
program.version(`wx-mini-cli ${require("../package.json").version}`);

// 配置首行提示
program.name("wx-mini-cli").usage(`<command> [option]`);

// 配置 config 命令
program
  .command("config [value]") // config 命令
  .description("inspect and modify the config")
  .option("-g, --get <key>", "get value by key")
  .option("-s, --set <key> <value>", "set option[key] is value")
  .option("-d, --delete <key>", "delete option by key")
  .action((value, keys) => {
    // value 可以取到 [value] 值，keys会获取到命令参数
    console.log(value, keys);
  });

// 监听 --help 指令
program.on("--help", function () {
  // 前后两个空行调整格式，更舒适
  console.log();
  console.log(
    `Run ${chalk.cyan(
      "wx-mini-cli <command> --help"
    )} for detailed usage of given command.`
    // " Run wx-mini-cli <command> --help for detailed usage of given command."
  );
  console.log();
});

// todo init文件
program
  .command("init")
  .description("init config files")
  .action(() => {
    // require("../lib/init.js");
  });

// 项目启动
program
  .command("start")
  .description("update env & pack npm package")
  .action(() => {
    console.log({ appid });
    if (!Utils.checkFileExist(`${projectPath}/private.${appid}.key`)) {
      console.log(
        `${chalk.red("根目录找不到上传密钥")}\n请查看README里${chalk.cyan(
          "【关于使用miniprogram-ci】"
        )}部分`
      );
    } else {
      require("../lib/start.js");
    }
  });

// todo 在开发者工具打开
program
  .command("open")
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if it exists")
  .action(() => {
    require("../lib/open")();
  });

// 创建 page / component
program
  .command("create")
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if it exists")
  .action(() => {
    require("../lib/create");
  });

// 上传 & 通知(todo)
program
  .command("publish")
  .description("upload project & send qrCode to chat")
  .option("-f, --force", "overwrite target directory if it exists")
  .action(() => {
    console.log("===", appid);
    if (!Utils.checkFileExist(`${projectPath}/private.${appid}.key`)) {
      console.log(
        `${chalk.red("根目录找不到上传密钥")}\n请查看README里${chalk.cyan(
          "【关于使用miniprogram-ci】"
        )}部分`
      );
    } else {
      require("../lib/publish-cli.js");
    }
  });

program.parse(process.argv);
