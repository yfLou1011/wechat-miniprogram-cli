#!/usr/bin/env node
const { program } = require("commander");
const chalk = require("chalk");

let projectPath = process.cwd();
let { appid } = require(`${projectPath}/project.config.json`);
const Utils = require("../utils/index");

// 查看版本号
program.version(`wx-mini-cli ${require("../package.json").version}`);

// 配置首行提示
program.name("wx-mini-cli").usage(`<command> [option]`);

// 监听 --help 指令
program.on("--help", function () {
  // 前后两个空行调整格式，更舒适
  console.log();
  console.log(
    `Run ${chalk.cyan(
      "wx-mini-cli <command> --help"
    )} for detailed usage of given command.`
  );
  console.log();
});

// todo init小程序项目
program
  .command("init")
  .description("init a wechat miniprogram program")
  .action(() => {
    // require("../lib/init.js");
  });

// 配置config文件
program
  .command("config")
  .description("fetch config files")
  .action(() => {
    require("../lib/config.js");
  });

// 项目启动
program
  .command("start")
  .description("update env & pack npm package")
  .action(() => {
    console.log({ appid });
    if (!Utils.checkFileExist(`${projectPath}/scripts`)) {
      console.log(
        `${chalk.red("根目录找不到执行脚本")}\n请执行${chalk.cyan(
          "wechat-miniprogram-cli config"
        )}并选择${chalk.cyan("script.env.js")}`
      );
      return;
    }
    if (!Utils.checkFileExist(`${projectPath}/private.${appid}.key`)) {
      console.log(
        `${chalk.red(
          " 根目录找不到上传密钥 or 秘钥与appid不匹配"
        )}\n ${chalk.cyan(
          "请前往微信开发者工具-编辑-npm构建"
        )}\n 如需使用自动化构建，请查看README里${chalk.cyan(
          "【关于使用miniprogram-ci】"
        )}部分 
       `
      );
      require("../lib/start.js")(false);
    } else {
      require("../lib/start.js")(true);
    }
  });

// // todo 在开发者工具打开
// program
//   .command("open")
//   .description("create a new project")
//   .option("-f, --force", "overwrite target directory if it exists")
//   .action(() => {
//     require("../lib/open")();
//   });

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
