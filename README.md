# ChatGPT-Fast-Web

> 本地部署你的私人 ChatGPT 网页应用，支持 GPT3, GPT4 模型。
> 无需服务端后端，轻量化，快速响应

![demo](./demo.png)

## 功能

- 多模型选择（GPT3, GPT4）
- 极快的响应速度，支持流式响应
- 支持Markdowm语法，代码高亮复制等
- 支持上下文联系与删除
- 角色（面具）功能 参考项目：[NextChat](https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web)

## 更新日志

<details open>
<summary><b>2024年</b></summary>
	
日期   |  更新内容
------- | :-------
4-8  | 新增对话记录的时间显示，优化ui
</details>

## 本地部署

### 填写密钥

```
# src/store/openai.ts文件

# OPENAI_BASE_URL官方地址为 'https://api.openai.com/v1'
OPENAI_BASE_URL: '',
OPENAI_API_KEY: '',
```

### 在项目根目录运行以下命令

```shell
npm install
```

```shell
npm run dev
```


## 致谢
[![Stargazers repo roster for @kidkin/ChatGPT-Fast-Web](https://reporoster.com/stars/notext/kidkin/ChatGPT-Fast-Web)](https://github.com/kidkin/ChatGPT-Fast-Web/stargazers)
[![Forkers repo roster for @kidkin/ChatGPT-Fast-Web](https://reporoster.com/forks/notext/kidkin/ChatGPT-Fast-Web)](https://github.com/kidkin/ChatGPT-Fast-Web/network/members)

## LICENSE

[MIT](https://opensource.org/license/mit/)
