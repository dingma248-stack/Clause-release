# Clause

一个优雅的桌面 AI 对话客户端，支持任何 OpenAI 兼容接口。

## 下载

到 [Releases](https://github.com/dingma248-stack/Clause-release/releases/latest) 下载最新的 Windows 安装包 `Clause-Setup-<版本>-x64.exe`。

## 自动更新

装好以后 Clause 会自己检查新版本，在后台下载，重启或退出时换上：

- 大多数更新只换程序本身（`app/Clause-<版本>-app.asar.gz`，十几 MB）；换上后先自检，启动不了会自动退回原来的版本。
- 需要新运行时的更新会下载完整安装包，静默安装。

`latest.json` 是当前版本的说明：版本号、更新内容，以及每个安装包的大小和 SHA-256。Clause 只使用大小和校验值都对得上的下载。
