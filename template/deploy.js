const { Command } = require("commander");
const execSync = require("child_process").execSync;

const program = new Command();
const { mpCI, robotMap } = require("../lib/ci.js");
const { sendMsg } = require("./webhook");
const [, , , ENV, ROBOT, CI_COMMIT_TAG] = process.argv;

program
  .command("preview")
  .description("send preview qrcode to robot")
  .action(async () => {
    try {
      execSync("npm i");
      console.log("npm i执行完毕");

      await mpCI.packNpm();
      console.log("npm构建完毕");

      await mpCI.preview(ROBOT);
      console.log("preview success");

      sendMsg(ENV);
    } catch (error) {
      console.error("preview fail", error);
    }
  });

program
  .command("upload")
  .option("-d, --description [description]", "upload description")
  .option("-t, --tag [description]", "upload tag")
  .description("upload the package")
  .action(async () => {
    try {
      execSync("npm i");
      console.log("npm install执行完毕");

      execSync(`node ./scripts/script.env.js ${ENV}`);
      console.log(`环境已配置到: ${ENV}`);

      await mpCI.packNpm();
      console.log("npm构建完毕");

      // 版本号默认取最新的tagName
      await mpCI.upload(ENV, CI_COMMIT_TAG);

      sendWebhookMsg({
        msgtype: "markdown",
        markdown: {
          content: `<font color=\"info\">体验版上传成功！</font> 已上传到【ci机器人${robotMap[ENV]}】，环境已配置到: ${ENV}`,
        },
      });
    } catch (error) {
      console.error("upload fail", error);
      sendWebhookMsg({
        msgtype: "markdown",
        markdown: {
          content:
            '<font color="error">体验版上传失败</font>  [请至gitlab查看](https://code.devops.xiaohongshu.com/fe/sns-basic/topmvp/-/pipelines)',
        },
      });
    }
  });

program.command("packNpm").action(async () => {
  try {
    await myCI.packNpm();
  } catch (error) {
    console.error("packNpm fail", error);
  }
});

program.parse(process.argv);
