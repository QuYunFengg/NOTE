###webpack proxyTable设置跨域



###### 一、为什么要写这篇文章

* 在之前的项目之中遇到去修改webpack的配置的时候很少，这次是为了帮助朋友处理proxyTable的配置问题顺便学习了一波。
* 

######二、这篇文章能帮助我们学习到什么

* 使用proxyTable主要是解决开发阶段的跨域问题。

* 在不了解这个配置之前是使用chrome设置跨域的。

  

###### 三、如何使用

* 我们的项目通常是使用vue-cli来进行初始化的。我们要找到项目根目录里面的config下的index.js文件。这个跨域是配置在开发阶段的那么我们就要配置在dev里面

```javascript
dev: {
  env: require('./dev.env'),
  port: 8080,
  autoOpenBrowser: true,
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  proxyTable: {
    '/taget': {
      target: 'http://www.baidu.com',  //目标接口域名
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/taget': '/taget'   //重写接口
      }
    },
  cssSourceMap: false
}
```

* 上面这段代码效果就是将本地启动项目，将本地8080端口的请求代理到了http://www.baidu.com下

* 其实使用起来非常简单

  

###### 四、注意的问题

* 之前我们写request封装的时候总是把后台请求url整个封装好,比如:

```javascript
let baseUrl = 'http://192.168.1.120';
// 调用
request(baseUrl + '/login')
```

* 使用proxyTable的时候不能在定义绝对路径的请求了，要保证请求的url是http://localhost:8080这种
* 再就是这个设置只是来控制开发阶段的请求代理，正式部署之后需要nginx来实现上线环境的跨域，或者使用process.ENV来判断当前所属环境

