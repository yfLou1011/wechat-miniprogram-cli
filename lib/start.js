const { prompt } = require("inquirer");
const execSync = require("child_process").execSync;
const { mpCI } = require("./ci.js");

(() => {
  prompt([
    {
      name: "env",
      type: "list",
      message: "请选择要构建的版本",
      choices: ["sit", "beta", "prod"],
      default: "sit",
    },
  ])
    .then(async (answers) => {
      execSync("npm i");
      console.log("npm i —— 完成");

      execSync(`node ./scripts/script.env.js ${answers.env}`);
      console.log(`环境已配置到: ${answers.env}`);

      await mpCI.packNpm();
      console.log("npm 构建完成");
    })
    .catch((error) => {
      console.error("error", error);
    });
})();
