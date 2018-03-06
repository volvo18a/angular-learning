# angular-cli部分指令使用

> 创建组件

```bash
ng g component name
```

```name``` 遵循 ```xxx-xxx``` 格式

> 创建路由

```bash
ng generate module app-routing --flat --module=app
```

```--flat``` 生成文件在目录 ```src/app``` 下，而不是他自己的目录
```--module=app``` 告诉 _CLI_ 在 ```AppModule``` 的 ```improts``` 数组中注册

> 创建服务

```bash
ng generate service name --module=app
```

> 编译生成静态文件

```bash
ng build -w
```

确保生成的静态文件无误后，需要放到生产环境则继续运行


```bash
ng build --prod
```

生成的文件即为生产环境文件

> 引入自己的js文件

_angular-cli.json_ 文件

```js
"scripts": [
  "tools/getScreenId.js",
  "tools/RecordRTC.js",
  "tools/adapter.min.js",
  "tools/mrtcsession.js",
  "tools/mrtc.js"
],
```

示例中引入的文件目录是 ```src``` 下的tools文件夹中的js文件

持续更新ing( •̀ ω •́ )y
