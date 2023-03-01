# 小程序脚手架

提供快速启动、开发辅助、打包部署等功能的小程序脚手架

## 安装(todo)

`npm i wechat-miniprogram-cli -g`

项目使用参考地址 [wechat-miniprogram-template](https://code.devops.xiaohongshu.com/yifanlou/wechat-mini-program-cli)

## 命令行使用

1. 查看命令行工具版本

   `wechat-miniprogram-cli -V`

2. 查看帮助

   `wechat-miniprogram-cli -h`

3. (todo)初始化配置文件

- 在./scripts 生成 script.env.js 文件
- 在根目录生成.gitlab-ci.yml 文件

  `wechat-miniprogram-cli init`

4. 安装构建依赖 & 切换环境

   `wechat-miniprogram-cli start`

5. (todo)在打开开发者工具中打开

   `wechat-miniprogram-cli open`

6. 创建页面或组件

   `wechat-miniprogram-cli create`

7. 发布小程序

   `wechat-miniprogram-cli publish`

## 关于使用 miniprogram-ci

- 使用 miniprogram-ci 前，应前往 [微信公众平台](https://mp.weixin.qq.com/) 开发管理-开发设置-小程序代码上传，下载小程序上传秘钥并把文件放在根目录
- 一般来说自己使用，可以关闭 IP 白名单，因为 IP 地址可能变

## 关于使用 企微推送开发版二维码

- 在 project.config.json 文件里配置 webHookPath
