# 小程序脚手架

提供快速启动、开发辅助、打包部署等功能的小程序脚手架

## 安装(todo)

`npm i wechat-miniprogram-cli -g`

项目使用参考地址 [wechat-miniprogram-template](https://code.devops.xiaohongshu.com/yifanlou/wechat-miniprogram-template)

## 命令行使用

1. 查看命令行工具版本

   `wechat-miniprogram-cli -V`

2. 查看帮助

   `wechat-miniprogram-cli -h`

3. (todo)拉取小程序项目 init

   `wechat-miniprogram-cli init`

4. 初始化配置文件

   `wechat-miniprogram-cli config`

   提供以下 config 文件模板

   - script.env.js
   - .gitlab-ci.yml
   - .gitignore
   - .eslintrc.js
   - .prettierrc.js

5. 安装构建依赖 & 切换环境

   `wechat-miniprogram-cli start`

6. 创建页面或组件

   `wechat-miniprogram-cli create`

7. 发布小程序

   `wechat-miniprogram-cli publish`

## 关于使用 miniprogram-ci

- 使用 miniprogram-ci 前，应前往 [微信公众平台](https://mp.weixin.qq.com/) 开发管理-开发设置-小程序代码上传，下载小程序上传秘钥并把文件放在根目录
- 请确认秘钥与`project.config.json`里的 `appid` 是一致的
- 一般来说自己使用，可以关闭 IP 白名单，因为 IP 地址可能变

## 关于使用 企微推送开发版二维码

- 在 project.config.json 文件里配置 webHookPath
