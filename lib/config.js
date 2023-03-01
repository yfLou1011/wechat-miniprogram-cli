const inquirer = require("inquirer");
const path = require("path");
const chalk = require("chalk");

const projectPath = process.cwd();
const templatePath = path.join(__dirname, "..");

const Utils = require("../utils/index");

function getEnvFile(file) {
  if (!Utils.checkFileExist(`${projectPath}/scripts`)) {
    const src = `${projectPath}/scripts`;
    Utils.createDir(src);
    console.log(chalk.green(`scripts文件夹创建成功`));
  }

  const src1 = `${templatePath}/template/scripts/${file}`;
  const desc1 = `${projectPath}/scripts/${file}`;
  const src2 = `${templatePath}/template/scripts/env.js`;
  const desc2 = `${projectPath}/scripts/env.js`;

  if (Utils.checkFileExist(desc1)) {
    console.log(chalk.red(`${file}文件已存在`));
  } else {
    Utils.copyFile(src1, desc1);
    Utils.copyFile(src2, desc2);
    console.log(chalk.green(`${file}文件创建成功`));
  }
}

function getCIFile(file) {
  const src = `${templatePath}/template/${file}`;
  const desc = `${projectPath}/${file}`;
  if (Utils.checkFileExist(desc)) {
    console.log(chalk.red(`${file}文件已存在`));
  } else {
    Utils.copyFile(src, desc);
    console.log(chalk.green(`${file}文件创建成功`));
  }
}

function getPrettierrc(file) {
  const src = `${templatePath}/template/${file}`;
  const desc = `${projectPath}/${file}`;
  if (Utils.checkFileExist(desc)) {
    console.log(chalk.red(`${file}文件已存在`));
  } else {
    Utils.copyFile(src, desc);
    console.log(chalk.green(`${file}文件创建成功`));
  }
}

const askQuestions = () => {
  const questions = [
    {
      type: "list",
      name: "config",
      message: "Select config files that you want to add:",
      choices: [
        "script.env.js",
        ".gitlab-ci.yml",
        ".gitignore",
        ".eslintrc.js",
        ".prettierrc.js",
      ],
    },
  ];
  return inquirer.prompt(questions);
};

const run = async () => {
  const answers = await askQuestions();
  const { config } = answers;

  switch (config) {
    case "script.env.js":
      getEnvFile(config);
      break;
      // case ".gitlab-ci.yml":
      //   getCIFile(config);
      //   break;
      // case ".prettierrc":
      //   getPrettierrc(config);
      break;
    default:
      getCIFile(config);
  }
};

run();
