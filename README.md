# 小程序脚手架

提供快速启动、开发辅助、代码规范配置、打包部署等功能的小程序脚手架

## 功能

- 项目快速启动
- 模板创建
- module alias
- CI
- config 配置: 代码风格基础：ESLint、styleLint; commit 配置：formula-githooks
- 发布
- 支持 Stylus
- 分包

## 安装

`npm i wx-mini-cli -g`

## 命令行使用

1. 查看命令行工具版本

   `wx-mini-cli -V`

2. 查看帮助

   `wx-mini-cli -h`

3. 安装构建依赖 & 切换环境

   `wx-mini-cli start`

4. (todo)在打开开发者工具中打开

   `wx-mini-cli open`

5. 创建页面或组件

   `wx-mini-cli create`

6. 发布小程序

   `wx-mini-cli publish`

## 关于使用 miniprogram-ci

- 使用 miniprogram-ci 前，应前往 [微信公众平台](https://mp.weixin.qq.com/) 开发管理-开发设置-小程序代码上传，下载小程序上传秘钥并把文件放在根目录
- 一般来说自己使用，可以关闭 IP 白名单，因为 IP 地址可能变

## 关于使用 企微推送开发版二维码

- 在 project.config.json 文件里配置 webHookPath
