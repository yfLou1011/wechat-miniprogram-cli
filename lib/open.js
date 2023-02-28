// const execSync = require("child_process").execSync;
const path = require("path");

async function getUserConf({ level = 2 } = {}) {
  let userConfPath = `${Config.dir_root}/ci.config.js`;
  if (!Utils.checkFileExist(userConfPath)) {
    userConfPath = `${Config.dir_root}/ci.config.mjs`;
    if (!Utils.checkFileExist(userConfPath)) {
      if (level == 2) {
        Log.err("当前项目尚未创建ci.config.js文件");
        return process.exit(1);
      } else {
        return null;
      }
    }
  }
  let data = (userConf = (await import(userConfPath)).default);
  if (!!data.template) {
    Config.template = path.resolve(path.join(Config.dir_root, data.template));
  }

  setConfig(data);
  return data;
}

module.exports = async function () {
  // ide路径
  const userConf = await getUserConf();
  const idePath = userConf.idePath || "/Applications/wechatwebdevtools.app/";
  const cliPath = `${idePath}Contents/MacOS/cli`;
  const openDir = path.resolve(path.join(process.cwd(), userConf.open || ""));

  console.log({ userConf, idePath, cliPath, openDir });

  if (status !== 0) process.exit(1);

  console.log(`打开开发者工具成功`);
};
