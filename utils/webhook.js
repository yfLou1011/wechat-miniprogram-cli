var https = require("follow-redirects").https;
const path = require("path");
const md5File = require("md5-file");
const fs = require("fs");

let projectPath = process.cwd();
let { webHookPath } = require(`${projectPath}/project.config.json`);
let { msgTemplate } = require("./git-info");

/**
 * 通过企业微信发送通知
 * @param {*} postData  通知内容
 */
sendWebhookMsg = function (postBody) {
  var options = {
    method: "POST",
    hostname: "qyapi.weixin.qq.com",
    path: webHookPath,
    headers: {
      "Content-Type": "text/plain",
    },
    maxRedirects: 20,
  };

  var req = https.request(options, function (res) {
    var chunks = [];
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });

    res.on("error", function (error) {
      console.error(error);
    });
  });
  req.write(JSON.stringify(postBody));
  req.end();
};

const sendMsg = (ENV) => {
  try {
    const qrCodePath = path.resolve(projectPath, "qrcode.jpg");
    const imageData = fs.readFileSync(`${qrCodePath}`);
    const imageBase64 = imageData.toString("base64");

    const previewPath = path.resolve(projectPath, "./qrcode.jpg");
    const hash = md5File.sync(previewPath);

    if (!imageBase64 || !hash) throw "缺少二维码，不推送钉钉消息";

    sendWebhookMsg({
      msgtype: "markdown",
      markdown: {
        content: msgTemplate(ENV),
      },
    });

    sendWebhookMsg({
      msgtype: "image",
      image: {
        base64: imageBase64,
        md5: hash,
      },
    });
    console.log("send code");
  } catch (error) {
    console.error("send code error: ", error);
  }
};

module.exports = { sendMsg, sendWebhookMsg };
