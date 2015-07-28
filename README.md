#介绍
`myslider`是一个基于`angularjs`的图片轮播组件,只支持移动端，其他请自行测试。

本项目是`myslider`的一个`demo`，基于`angularjs` v1.2.25。

#使用说明
1. 引入脚本和样式表
  引入`myslider.js`和`myslider.css`

2. 在`html`页面中加入如下代码：

  ```
<my-carousel ng-style="sizes" my-data="data" my-interval="3000" my-callback="bbb">
  <my-slider ng-repeat="item in data">
      <a ng-style="sizes">
          <img ng-src="{{item.imageUrl}}" width="{{sizes.width}}" height="{{sizes.height}}"/>
      </a>
  </my-slider>
</my-carousel>
  ```

  其中`my-data`是数据源，`my-interval`是轮播间隔，`my-callback`是每滚动一页的回调函数，只需要传入函数名称即可
  然后在控制器中监听这个方法名，比如：
  ```
  $scope.$on('bbb', function (event, data) {//回调的第一个参数是事件对象，第二个是回调数据，包含了当前的滚动到第几张图的索引值data.index
      console.log(event);
      console.log(data.index);
  })

  ```

  图片的宽高可以根据屏幕的宽度以及图片自身的比例来计算。一般图片的宽度等于屏幕的宽度~

3. 在声明`app`的时候，把`sliderApp`加入依赖列表，像这样：

  ```
var app = angular.module("app", [
    "ui.router",
    'sliderApp'
]);
  ```

#在线demo
扫描下边的二维码或

前往[demo地址](http://codeyoo.com/demos/myslider/main.html#/index)可以在线测试 ^_^

![demo在线预览](http://img.codeyoo.com/myslider/preview.jpg)

#优化
这只是个初版，后续会继续优化
