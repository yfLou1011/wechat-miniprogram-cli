const inquirer = require("inquirer");
const execSync = require("child_process").execSync;
// const { loading } = require("../utils/loading");

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

const run = async (packNpm) => {
  const answers = await askQuestions();
  const { env } = answers;

  // todo loading
  execSync("npm i");
  console.log("npm i —— 完成");

  execSync(`node ./scripts/script.env.js ${env}`);
  console.log(`环境已配置到: ${env}`);

  if (packNpm) {
    const { mpCI } = require("./ci.js");
    await mpCI.packNpm();
    console.log("npm 构建完成");
  }
};

// 当前函数中可能存在很多异步操作，因此我们将其包装为 async
module.exports = async function (packNpm) {
  console.log({ packNpm });
  run(packNpm);
};
