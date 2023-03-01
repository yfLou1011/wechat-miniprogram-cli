const { prompt } = require("inquirer");
const execSync = require("child_process").execSync;

const { mpCI } = require("./ci.js");
const fs = require("fs");

let projectPath = process.cwd();
let pkg = require(`${projectPath}/package.json`);

// const { sendMsg } = require("./webhook");

const args = process.argv.slice(2);
const ENV = args[0] || "sit";

// 增加版本号
function versionNext(array, idx) {
  let arr = [].concat(array);
  ++arr[idx];

  arr = arr.map((v, i) => (i > idx ? 0 : v));

  if (!parseInt(arr[arr.length - 1])) arr.pop();
  return arr.join(".");
}

//
function getVersionChoices(version) {
  const vArrsDesc = ["版本升级: ", "特性更新: ", "修改补丁: "];

  let vArrs = version.split(".");

  let choices = vArrsDesc
    .map((item, index, array) => {
      array.length >= vArrs.length ? vArrs.push(0) : "";
      return vArrsDesc[index] + versionNext(vArrs, index);
    })
    .reverse();

  return choices;
}

//
function getVersion(v) {
  if (ENV === "prod") return v.split(": ")[1];
  return pkg.version;
}

// 修改本地版本文件
function rewriteLocalVersionFile(answers) {
  fs.writeFile(
    `${projectPath}/package.json`,
    JSON.stringify(
      Object.assign({}, pkg, { version: getVersion(answers.version) }),
      null,
      2
    ),
    async (err) => {
      if (err) {
        console.log("==rewriteLocalVersionFile===", { err });
        console.error(err);
        process.exit(-1);
      }
      console.log("The file has been saved!");
      run(answers);
    }
  );
}

// 获取prompt问题
function getQuestion() {
  let questionList = [
    {
      name: "env",
      type: "list",
      message: "请选择要构建的版本",
      choices: ["sit", "beta", "prod"],
      default: "sit",
    },
    {
      name: "version",
      type: "list",
      message: `请选择预发布版本号(当前版本号: ${pkg.version})`,
      choices: getVersionChoices(pkg.version),
      default: pkg.version,
      when: (answers) => answers.env === "prod",
    },
    {
      name: "send",
      type: "confirm",
      message: "是否要推送到企微群",
      default: false,
    },
    {
      name: "robot",
      type: "list",
      message: "请选择推送的机器人🤖:",
      choices: Array.from(Array(30), (i, index) => index + 1),
      when: (answers) => answers.send,
    },
    {
      name: "upload",
      type: "confirm",
      message: "是否要上传到小程序后台",
      default: false,
    },
  ];
  return questionList;
}

async function run(answers) {
  const ENV = answers.env;

  execSync("npm i");
  console.log("npm i —— 完成");

  execSync(`node ./scripts/script.env.js ${ENV}`);
  console.log(`环境已配置到: ${ENV}`);

  await mpCI.packNpm();
  console.log("npm 构建完成");

  if (!!answers.send) {
    await mpCI.preview(answers.robot);
    // sendMsg(ENV);
  }

  if (!!answers.upload) await mpCI.upload(ENV, getVersion(answers.version));
}

(() => {
  prompt(getQuestion())
    .then(async (answers) => {
      console.info("Answer:", { answers });

      if (answers.env === "prod") {
        rewriteLocalVersionFile(answers);
      } else {
        run(answers);
      }
    })
    .catch((error) => {
      console.error("error", error);
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
})();
