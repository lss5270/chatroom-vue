# chatroom-vue
一个简单的多人聊天室。基于vue和node+Socket.IO。更多功能正在开放中……

## 如何运行
下载项目
```
 git clone https://github.com/lss5270/chatroom-vue.git
```

进入到chatroom-vue目录安装依赖包
```
 npm install
```

启动server服务（称这个终端为S终端，得先启动后台服务，否则前端页面无法成功连接Socket），在执行以下命令后，成功执行会终端会提示'app listen at：8081'
```
 npm run server
```

另起窗口（注意：是另起窗口！），启动前端开发服务（称这个终端为B终端），在chatroom-vue目录里执行以下命令，成功执行后，在浏览器输入访问地址`http://localhost:8080`
```
 npm run dev
```
## 关于进程守护
如果服务端需要进程守护，把启动命令从npm run server替换成以下命令即可。（确保全局安装过pm2：npm install pm2 -g）
```
 npm run pm2
```

## 效果图
 <p align="center">
  <img width="900" src="https://raw.githubusercontent.com/lss5270/chatroom-vue/master/gifs/view1.jpg">
  <img  src="https://raw.githubusercontent.com/lss5270/chatroom-vue/master/gifs/view2.jpg">
</p>

