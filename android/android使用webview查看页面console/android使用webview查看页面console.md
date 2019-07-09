### android唤醒屏幕


###### 一、为什么要写这篇文章

* 在做一个android应用适配android 4.4.1 的时候出现了一个问题，使用webView引入一个gis地图时，整个webView显示空白，需要查看webView的控制台定位问题


###### 二、如何使用

* 

```javascript
        WebView webView = findViewById(R.id.webView);
        /** 打印日志 **/
        webView.setWebChromeClient(new WebChromeClient() {   
            public boolean onConsoleMessage(ConsoleMessage cm) {
                Log.d("MyApplication", cm.message() + " -- From line "
                        + cm.lineNumber() + " of "
                        + cm.sourceId() );
                return true;
            }
        });
        webView.loadUrl("http://192.168.1.50:3001");
        /** 重点允许webview执行js **/
        webView.getSettings().setJavaScriptEnabled(true);
```


  

###### 三、注意的问题

* 最后确认的问题是 webView并不支持es6的语法需要改成es5
* 在webview加载的js中遇到了一个new Map() 对象，因为时gis地图以为Map是一个地图相关对象，但是一直报未定义，后发现时es6的Map
* 使用es5实现Map对象的操作以适配
```javascript
    function Map() {
        var items = {};
        this.has = function(key){
            return key in items;
        },
        this.set = function(key,value){
            items[key] = value;
        },
        this.remove = function(key){
            if (this.has(key)) {
                delete items[key];
                return true;
            }
            return false;
        },
        this.get = function(key){
            return this.has(key)?items[key]:undefined;
        },
        this.values = function(){
            var values = [];
            for(var k in items){
                if (this.hasOwnProperty(k)) {
                    values.push(items[k]);
                }
            }
            return values;
        },
        this.clear = function(){
            items = {};
        },
        this.size = function(){
            return Object.Keys(items).length;
        },
        this.getItems = function(){
            return items;
        }
    }
```
