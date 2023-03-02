const inquirer = require("inquirer");
const { mkdir, readFile, writeFile } = require("fs");
const chalk = require("chalk");
const path = require("path");
const Utils = require("../utils/index");

const templatePath = `${path.join(__dirname, "..")}/template`;
const projectPath = process.cwd();
const fileType = [".wxml", ".ts", ".json", ".styl"];
const encoding = "utf-8";

const askQuestions = () => {
  const questions = [
    {
      type: "list",
      name: "Create",
      message: "请选择要创建的类型",
      choices: ["页面", "组件"],
    },
    {
      type: "input",
      name: "Input",
      message: "请输入文件名称",
    },
  ];
  return inquirer.prompt(questions);
};

const rsyncData = async (Type, Input) => {
  if (!Utils.checkFileExist(`${projectPath}/${Type}`)) {
    const src = `${projectPath}/${Type}`;
    Utils.createDir(src);
    console.log(chalk.green(`${Type}文件夹创建成功`));
  }

  mkdir(`${projectPath}/${Type}/${Input}`, (err) => {
    if (err) {
      console.log(
        chalk.red(`创建组件失败 --- ${projectPath}/${Type}/${Input}组件已存在`)
      );
      return;
    }

    fileType.map((item) => {
      readFile(
        `${templatePath}/${Type}/${Type}${item}`,
        { encoding },
        function (err, msg) {
          writeFile(
            `${projectPath}/${Type}/${Input}/index${item}`,
            msg,
            encoding,
            function (error) {
              if (error) {
                console.log(error);
                return false;
              }
              console.log(chalk.green(`${Type}/${Input}/index${item}创建成功`));
            }
          );
        }
      );
    });
  });
};

const run = async () => {
  // init();
  const answers = await askQuestions();
  const { Create, Input } = answers;
  let Type;
  switch (Create) {
    case "页面":
      Type = "pages";
      break;
    case "组件":
      Type = "components";
      break;
  }
  await rsyncData(Type, Input);
};

run();
