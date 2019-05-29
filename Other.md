### 开发问题点解决记录

1. 一个iframe页面，如需使用fullscreen功能需要在iframe标签添加 allowfullscreen  allow="fullscreen" 属性;
2. iframe加载视频自动播放，chrome高版本需要添加属性allow="autoplay";
3. 在vue页面里面使用js防抖
```
this.FireFunCall = _.debounce(this.FireFun, 500,  {'leading': true,'trailing': false});
// mounted 定义方法被防抖修饰，最后调用FireFunCall方法完成防抖实现
```