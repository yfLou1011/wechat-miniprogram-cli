const inquirer = require("inquirer");
const execSync = require("child_process").execSync;
const chalk = require("chalk");
const { loading } = require("../utils/loading");

const askQuestions = () => {
  const questions = [
    {
      name: "env",
      type: "list",
      message: "请选择要构建的版本",
      choices: ["sit", "beta", "prod"],
      default: "sit",
    },
  ];
  return inquirer.prompt(questions);
};

function install() {
  execSync("npm i");
}

function updateEnv(env) {
  execSync(`node ./scripts/script.env.js ${env}`);
}

async function packNpmFunc() {
  const { mpCI } = require("./ci.js");
  await mpCI.packNpm();
  console.log("npm 构建完成");
}

const run = async (packNpm) => {
  const answers = await askQuestions();
  const { env } = answers;

  await loading("正在安装npm...", install);

  await loading(`环境已配置到: ${env}`, updateEnv, env);

  if (packNpm) {
    await loading("正在构建npm...", packNpmFunc);
  } else {
    console.log(`${chalk.cyan("请前往微信开发者工具手动构建: 工具-npm构建")}`);
  }
};

module.exports = async function ({ packNpm }) {
  run(packNpm);
};
