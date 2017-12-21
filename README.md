# chatroom-vue
多人聊天室。基于vue和node+Express + Socket.IO。更多功能正在开放中……

## 如何运行
下载项目
```
 git clone https://github.com/lss5270/chatroom-vue.git
```

 打开一个终端（称这个终端为A终端）进入到chatroom-vue目录安装依赖包
```
 npm install
```
启动server服务（得先启动后台服务，否则前端页面无法成功连接Socket），在执行以下命令后，成功执行会终端会提示'app listen at：8081'
```
 npm run server
```
启动前端开发服务，在chatroom-vue目录里执行以下命令，成功执行后，会自动打开浏览器访问前端开发环境，浏览地址是`http://localhost:8080`
```
 npm run dev
```

