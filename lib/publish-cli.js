const inquirer = require("inquirer");
const fs = require("fs");
const execSync = require("child_process").execSync;

const { mpCI } = require("./ci.js");
const { loading } = require("../utils/loading");

const projectPath = process.cwd();
const pkg = require(`${projectPath}/package.json`);
const { sendMsg } = require(`../utils/webhook`);

// const args = process.argv.slice(2);
// const ENV = args[0] || "sit";

/** ------- version 相关 ------ */
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

// 转换为package.json支持的格式
function getVersion(env, v) {
  if (env === "prod") return v.split(": ")[1];
  return pkg.version;
}

// 获取prompt问题
function getQuestions() {
  let questions = [
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
  return inquirer.prompt(questions);
}

/** ------- run 相关执行函数 ------ */
// 修改本地版本文件
function rewriteLocalVersionFile(env, version) {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      `${projectPath}/package.json`,
      JSON.stringify(
        Object.assign({}, pkg, { version: getVersion(env, version) }),
        null,
        2
      ),
      function (err) {
        if (err) {
          console.log("==rewriteLocalVersionFileError===", { err });
          reject(err);
          process.exit(-1);
        } else {
          resolve();
        }
      }
    );
  });
}

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
async function sendFunc(robot, env) {
  await mpCI.preview(robot);
  sendMsg(env);
}
async function sendFunc(robot, env) {
  await mpCI.preview(robot);
  sendMsg(env);
}
async function uploadFunc(env, version) {
  await mpCI.upload(env, getVersion(env, version));
}

async function run() {
  const answers = await getQuestions();
  const { env, version, send, robot, upload } = answers;
  // console.log({ env, version, send, robot, upload });

  if (env === "prod") {
    await rewriteLocalVersionFile(env, version);
  }
  await loading("正在安装npm...", install);
  await loading(`环境已配置到: ${env}`, updateEnv, env);
  await loading("正在构建npm...", packNpmFunc);
  if (!!send) {
    await loading("正在推送到企微群聊...", sendFunc, robot, env);
  }
  if (!!upload) {
    await loading("正在上传体验版...", uploadFunc, env, version);
  }
}

run();
