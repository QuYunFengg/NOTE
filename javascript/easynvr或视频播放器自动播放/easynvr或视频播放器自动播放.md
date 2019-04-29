### easynvr或视频播放器自动播放问题


###### 一、为什么要写这篇文章

* 在做一个视频监控页面的时候，遇到一个问题有的监控视频可以自动播放，但是有的监控视频不能。经过baidu、google解决这一问题。

###### 二、问题描述及问题解决

* 使用esaynvr的时候查看了它的源码，发现它也是通过video.js插件实现的，在不能自动播放页面的console里面，我们发现了
```javascript
'Cross-origin plugin content from http://vjs.zencdn.net/swf/5.0.0-rc1/video-js.swf must have a visible size larger than 400 x 300 pixels, or it will be blocked. Invisible content is always blocked.'
```
* 这样的警告内容。

* 很明显，这句话有2个关键点1.跨源插件2.大于400*300，这两个问题只要有一个问题能解决就能自动播放，首先大于400*300，有时我们可能需要做一个直播墙，每个窗口的大小可能会小于
* 400*300，我们不能对窗口的大小强制固定，这样做会影响页面布局，所以从窗口大小上解决这个问题貌似走不通。然后看跨源插件，我们只要把上面的插件下载到本地，然后以静态资源的方式
* 引入就能解决跨源的问题。

###### 三、如何使用

* 

```javascript
    /*  下载的包
        "video.js": "^6.6.0",
        "videojs-flash": "^2.2.0"
        "videojs-swf": "^5.4.2",
        vue-video-player
    */
    import videojs from 'video.js'
    import 'video.js/dist/video-js.css'
    import 'vue-video-player/src/custom-theme.css'
    import 'videojs-flash'
    import SWF_URL from 'videojs-swf/dist/video-js.swf'
    videojs.options.flash.swf = SWF_URL // 设置flash路径，Video.js会在不支持html5的浏览中使用flash播放视频文件
```

###### 四、注意的问题

* 在chorme 2018年6月份的更新之后 video标签自动播放需要添加muted属性，静音才可实现自动播放
* 如果使用iframe引入需要在iframe标签上添加 allow="autoplay" 属性    

