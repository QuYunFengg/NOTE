### [Chrome Devtools Performance使用指南(转载)](https://segmentfault.com/a/1190000011516068?utm_source=tag-newest#articleHeader0)


##### 一、为什么要写这篇文章

* 在开发途中有遇到浏览器卡死的状态，初步分析是内存泄漏问题，通过google发现可疑借助工具分析具体问题，进行性能调优


##### 二、如何使用

* 在这篇指南中，我们会用Performance工具去分析一个现有的在线DEMO，然后教会你怎么去分析，从而找到性能瓶颈。
  1. 打开Chrome的匿名模式。匿名模式可以保证Chrome在一个相对干净的环境下运行。比如说，你安装了许多chrome插件，这些插件可能会影响我们分析性能表现。
  2. 在匿名模式下打开右边这个链接，[DEMO](https://googlechrome.github.io/devtools-samples/jank/)，这个网页就是我们要用来分析的DEMO。这个页面里都是很多上下移动的蓝色小方块。
  3. 按下Command+Opiton+I（Mac）或者Control+shift+I (Windows, Linux) 来打开Devtools

![图片一](https://segmentfault.com/img/bVWtZF?w=2316&h=1626)

###### 模拟移动设备的CPU
---
移动设备的CPU一般比台式机和笔记本弱很多。当你想分析页面的时候，可以用CPU控制器（CPU Throttling）来模拟移动端设备CPU。
  1. 在DevTools中，点击 Performance 的 tab。
  2. 确保 Screenshots checkbox 被选中
  3. 点击 Capture Settings（⚙️）按钮，DevTools会展示很多设置，来模拟各种状况
  4. 对于模拟CPU，选择2x slowdown，于是Devtools就开始模拟两倍低速CPU

![图片二](https://segmentfault.com/img/bVWtZL?w=5166&h=3409)

###### 设置DEMO
---
为了使得这个DEMO有相对统一的运行表现（不同的读者，机器的性能千差万别）。这个DEMO提供了自定义功能，用来确保这个DEMO的统一表现。
  1. 一直点击 Add 10 这个按钮直到你能很明显看到蓝色小方块移动变慢，在性能比较好的机器上，大概要点击20次左右。
  2. 点击 Optimize按钮，你会发现蓝色小方块会变的很快而且动画变得平滑。
  3. 点击 un-optimize 按钮，蓝色小方块又会变成之前的模样。

###### 记录运行时性能表现
---
在之前的DEMO中，当你运行优化模式的时候，蓝色小方块移动地非常快。为什么呢？明明两个模式都是移动了同样数量的小方块而且移动的时间也一样。那么现在我们在Performance界面下录制下发生的一切，并且学习如何分析这个记录，从而找到非优化模式下的性能瓶颈。
  1. 在DevTools中，点击 Record 。这时候Devtools就开始录制各种性能指标

  ![图片三](https://segmentfault.com/img/bVWtZX?w=1238&h=816)

  2. 等待几分钟。
  3. 点击Stop按钮，Devtools停止录制，处理数据，然后显示性能报告

  ![图片四](https://segmentfault.com/img/bVWtZ1?w=1238&h=1376)

###### 分析报告
---
一旦你得到了页面的性能表现报告，那么就可以用它来分析页面的性能，从而找到性能瓶颈。

###### 分析每一秒的帧
---
FPS（frames per second）是用来分析动画的一个主要性能指标。能保持在60的FPS的话，那么用户体验就是不错的。
  1. 观察FPS图表，如果你发现了一个红色的长条，那么就说明这些帧存在严重问题，有可能导致非常差的用户体验。一般来说，绿色的长条越高，说明FPS越高，用户体验越好。

  ![图片五](https://segmentfault.com/img/bVWtZ2?w=5166&h=3425)

  2. 就在FPS图表下方，你会看到CPU图表。在CPU图表中的各种颜色与Summary面板里的颜色是相互对应的，Summary面板就在Performance面板的下方。CPU图表中的各种颜色代表着在这个时间段内，CPU在各种处理上所花费的时间。如果你看到了某个处理占用了大量的时间，那么这可能就是一个可以找到性能瓶颈的线索。

  ![图片六](https://segmentfault.com/img/bVWtZ5?w=5166&h=5741)

  3. 把鼠标移动到FPS，CPU或者NET图表之上，DevToos就会展示这个时间点界面的截图。左右移动鼠标，可以重发当时的屏幕录像。这被称为scrubbing, 他可以用来分析动画的各个细节。

  ![图片七](https://segmentfault.com/img/bVWtZ6?w=1297&h=856)

  4. 在Frames图表中，把鼠标移动到绿色条状图上，Devtools会展示这个帧的FPS。每个帧可能都在60以下，都没有达到60的标准。

  ![图片八](https://segmentfault.com/img/bVWt0c?w=1328&h=900)

当然这个对于DEMO，可以相当容易观察到性能的问题。但是在现实使用场景下，就不是那么容易观察到了。所以要把常常使用这些工具来分析页面。

小功能：显示实时FPS面板

另外一个好用的小工具就是实时FPS面板，它可以实时展示页面的FPS指标

  1. 按下 Command+Shift+P（Mac）或者 Control+Shift+P(Windows, Linux) 打开命令菜单
  2. 输入Rendering，点选Show Rendering
  3. 在Rendering面板里，激活FPS Meter。FPS实时面板就出现在页面的右上方。

  ![图片九](https://segmentfault.com/img/bVWt0h?w=1114&h=826)

  4. 关闭FPS Meter只要按下Escape就可以了。这篇指南里暂时用不上这个功能。

###### 分析每一秒的帧
---
现在已经确定到这个页面的动画性能表现不太好，那么下一步就是找到为什么
  1. 注意Summary面板，你会发现CPU花费了大量的时间在rendering上。因为提高性能就是一门做减法的艺术，你的目标就是减少rendering的时间

  ![图片九](https://segmentfault.com/img/bVWt0k?w=5166&h=4625)

  2. 展开Main图表，Devtools展示了主线程运行状况。X轴代表着时间。每个长条代表着一个event。长条越长就代表这个event花费的时间越长。Y轴代表了调用栈（call stack）。在栈里，上面的event调用了下面的event。

  ![图片十](https://segmentfault.com/img/bVWt0l?w=5367&h=4442)

  3. 在性能报告中，有很多的数据。可以通过双击，拖动等等动作来放大缩小报告范围，从各种时间段来观察分析报告。

  ![图片十一](https://segmentfault.com/img/bVWt0m?w=1238&h=962)

  4. 在事件长条的右上角出，如果出现了红色小三角，说明这个事件是存在问题的，需要特别注意。
  5. 双击这个带有红色小三角的的事件。在Summary面板会看到详细信息。注意reveal这个链接，双击它会让高亮触发这个事件的event。如果点击了app.js:94这个链接，就会跳转到对应的代码处。

  ![图片十二](https://segmentfault.com/img/bVWt0t?w=1238&h=1270)

  6. 在app.update这个事件的长条下方，有很多被触发的紫色长条。如果放大这些事件长条，你会看到它们每个都带有红色小三角。点击其中一个紫色事件长条，Devtools在Summary面板里展示了更多关于这个事件的信息。确实，这里有很多reflow的警告。
  7. 在summary面板里点击app.js:70链接，Devtools会跳转到需要优化的代码处

  ![图片十三](https://segmentfault.com/img/bVWt0w?w=1238&h=794)

  