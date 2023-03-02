const ci = require("miniprogram-ci");
const projectPath = process.cwd();
const { version, description } = require(`${projectPath}/package.json`);
const { appid, setting } = require(`${projectPath}/project.config.json`);
const { author, commitMsg } = require("../utils/git-info.js");

const robotMap = {
  sit: 1,
  beta: 2,
  prod: 3,
};

const project = new ci.Project({
  appid,
  type: "miniProgram",
  projectPath,
  privateKeyPath: `${projectPath}/private.${appid}.key`,
  ignores: ["node_modules/**/*"],
});

const mpCI = {
  packNpm: async () => {
    try {
      const warning = await ci.packNpm(project);
      console.warn("warning: ", warning);
    } catch (error) {
      console.error("=========构建npm失败了=========\n", error);
    }
  },
  upload: async (ENV = 1, VERSION) => {
    try {
      return await ci.upload({
        project,
        version: VERSION || version,
        desc: `${ENV} - ${commitMsg} - @${author}` || description,
        setting: {
          ...setting,
          es7: true,
          minify: true,
        },
        robot: robotMap[ENV], // 指定🤖
        // onProgressUpdate: console.log,
      });
    } catch (error) {
      console.error("=========上传失败了=========\n", error);
    }
  },
  preview: async (ROBOT) => {
    try {
      return await ci.preview({
        project,
        desc: description,
        setting: {
          ...setting,
          es7: true,
          minify: true,
          ignoreUploadUnusedFiles: true,
        },
        qrcodeFormat: "image",
        qrcodeOutputDest: `${projectPath}/qrcode.jpg`,
        robot: ROBOT, // 指定🤖
        // onProgressUpdate: console.log,
      });
    } catch (error) {
      console.error("=========生成二维码失败了========= \n", error);
    }
  },
};

module.exports = { mpCI, robotMap };
