# myslider
> 基于NG的图片轮播组件

#更新日志：
+ 2015/07/17 第一版本提交
+ 2015/07/17 修复图片在轮播过程中突然切换数据源导致的轮播错乱的BUG

使用说明：
```
<my-carousel ng-style="sizes" my-data="data" my-interval="3000">
    <my-slider ng-repeat="item in data">
        <a ng-style="sizes">
            <img ng-src="{{item.imageUrl}}" width="{{sizes.width}}" height="{{sizes.height}}"/>
        </a>
    </my-slider>
</my-carousel>
```
