/**
 * Created by sc09395 on 2015/7/13 0013.
 */
var _myApp = angular.module("_myApp", []);
_myApp.directive('myCarousel', ['$rootScope', '$timeout', '$parse', function ($rootScope, $timeout, $parse) {
    /*
     * playInterval : 自动播放间隔
     * */
    function mySlider(config) {
        this.timer;
        this.size = config.scope.myData && config.scope.myData.length || 0;
        this.width = this.getWinSize().width;
        this.minleft = -this.width * (this.size + 1);//最小left值，注意是负数[不循环情况下的值]
        this.maxleft = 0;//最大left值[不循环情况下的值]
        this.now_left = 0;//初始位置信息[不循环情况下的值]
        this.point_x = null;//记录一个x坐标
        this.point_y = null;//记录一个y坐标
        this.index = 0;//开始索引
        this.busy = false;
        this.playInterval = config.playInterval || 3000;
        this.scrollTime = 300;
        this.scope = config.scope;
        this.box = config.box;
        this.init();
    }

    mySlider.prototype = {
        constructor: mySlider,
        init: function () {
            var self = this;
            if (this.checkData()) {
                this.initDots()
                if (self.scope.myData.length > 1) {
                    this.initLoop();
                    this.bindEvents(this.box);
                    this.play();
                }
            }
        },
        checkData: function () {
            var self = this;
            if (!angular.isDefined(self.scope.myData) || self.scope.myData.length == 0) {
                return false;
            }
            return true;
        },
        /*
         * 生成dots
         * */
        initDots: function () {
            var self = this, arr = [];
            if (self.scope.myData && self.scope.myData.length > 0) {
                for (var i = 0; i < self.scope.myData.length; i++) {
                    arr.push(self.scope.myData[i]);
                }
            }
            self.scope.dotData = arr;
        },
        /*
         * 处理循环
         * */
        initLoop: function () {
            var self = this;
            var last = angular.toJson(self.scope.myData[self.scope.myData.length - 1]),
                fst = angular.toJson(self.scope.myData[0]);

            self.scope.myData.unshift(angular.fromJson(last));
            self.scope.myData.push(angular.fromJson(fst));

            this.now_left = -self.width;//设置初始位置信息
            this.minleft = -self.width * self.size;//最小left值
            this.maxleft = -self.width;

            this.box.parent().css("width", self.width + "px");
            this.box.css("width", (self.size + 2) * self.width + "px").css(self.getStyle(2));
        },
        /*
         * 绑定事件
         * */
        bindEvents: function (elem) {
            var self = this;
            elem.off().on('touchstart', function (e) {
                if (e.touches.length == 1 && !self.busy) {
                    self.point_x = e.touches[0].screenX;
                    self.point_y = e.touches[0].screenY;
                }
            }).on('touchmove', function (e) {
                if (e.touches.length == 1 && !self.busy) {
                    return self.move(e.touches[0].screenX, e.touches[0].screenY, e);
                }
            }).on('touchend', function (e) {
                !self.busy && self.move_end();
            });
        },
        /*
         * 自动播放
         * */
        play: function () {
            var self = this;
            $timeout.cancel(self.timer);
            self.timer = $timeout(function () {
                //console.log(self.size);
                console.log(self.scope.myData);
                self.goIndex(self.index + 1);
            }, self.playInterval);
        },
        /*
         * 跳到指定索引页
         * */
        goIndex: function (index) {
            var self = this;
            if (self.busy) return;
            $timeout.cancel(self.timer);

            self.busy = true;
            index = index < 0 ? -1 : index;
            index = index > self.size ? self.size : index;
            if (self.now_left == -self.width * (index + 1)) {
                self.complete(index);
            }
            else {
                if (index == -1 || index == self.size) {//循环滚动边界
                    self.index = index == -1 ? (self.size - 1) : 0;
                    self.now_left = index == -1 ? 0 : -self.width * (self.size + 1);
                } else {
                    self.index = index;
                    self.now_left = -(self.width * (self.index + 1));
                }
                self.box.css(this.getStyle(1));

                $timeout(function () {
                    self.complete(index);
                }, self.scrollTime);
            }
            self.updateDotsStatus(index);
        },
        /*
         * 更新dots状态
         * */
        updateDotsStatus: function (index) {
            var self = this;
            $timeout(function () {
                angular.forEach(self.scope['carouselCtrl'].sliders, function (item, index) {
                    item.isSelected = false;
                })
                if (index >= self.size) {
                    self.scope['carouselCtrl'].sliders[0].isSelected = true;
                }
                else if (index < 0) {
                    self.scope['carouselCtrl'].sliders[self.size - 1].isSelected = true;
                }
                else {
                    self.scope['carouselCtrl'].sliders[index].isSelected = true;
                }
            })
        },
        /*
         * 动画完成回调
         * */
        complete: function (index) {
            var self = this;
            self.busy = false;
            //self.config.callback && self.config.callback(self.index);
            if (index == -1) {
                self.now_left = self.minleft;
            } else if (index == self.size) {
                self.now_left = self.maxleft;
            }
            self.box.css(this.getStyle(2));
            self.play();
        },
        /*
         * 滚到下一页
         * */
        next: function () {
            if (!this.busy) {
                this.goIndex(this.index + 1);
            }
        },
        /*
         * 滚到上一页
         * */
        prev: function () {
            if (!this.busy) {
                this.goIndex(this.index - 1);
            }
        },
        /*
         * 滑动屏幕处理函数
         * */
        move: function (point_x, point_y, e) {
            e.preventDefault();
            var changeX = point_x - (this.point_x === null ? point_x : this.point_x),
                changeY = point_y - (this.point_y === null ? point_y : this.point_y),
                marginleft = this.now_left, return_value = false,
                sin = changeY / Math.sqrt(changeX * changeX + changeY * changeY);
            this.now_left = marginleft + changeX;
            this.move_left = changeX < 0;
            if (sin > Math.sin(Math.PI / 3) || sin < -Math.sin(Math.PI / 3)) {//滑动屏幕角度范围：PI/3  -- 2PI/3
                return_value = true;//不阻止默认行为
            }
            this.point_x = point_x;
            this.point_y = point_y;
            this.box.css(this.getStyle(2));
            return return_value;
        },
        /*
         * 滑动屏幕结束处理函数
         * */
        move_end: function () {
            var self = this;
            var changeX = this.now_left % this.width, ind;
            if (this.now_left < this.minleft) {//手指向左滑动
                ind = this.index + 1;
            } else if (this.now_left > this.maxleft) {//手指向右滑动
                ind = this.index - 1;
            } else if (changeX != 0) {
                if (this.move_left) {//手指向左滑动
                    ind = this.index + 1;
                } else {//手指向右滑动
                    ind = this.index - 1;
                }
            } else {
                ind = this.index;
            }
            this.point_x = this.point_y = null;
            this.goIndex(ind);
        },
        /*
         获取动画样式，要兼容更多浏览器，可以扩展该方法
         @int flg : 1 动画 2  没动画
         */
        /*
         * 获取设置样式
         * */
        getStyle: function (flg) {
            var x = this.now_left,
                time = flg == 1 ? this.scrollTime : 0;
            return {
                '-webkit-transition': '-webkit-transform ' + time + 'ms',
                '-webkit-transform': 'translate3d(' + x + 'px,0,0)',
                '-webkit-backface-visibility': 'hidden',
                'backface-visibility': 'hidden',
                'transition': 'transform ' + time + 'ms',
                'transform': 'translate3d(' + x + 'px,0,0)'
            };
        },
        getWinSize: function () {
            var wid, hei;//宽,高
            //获取窗口宽度
            if (window.innerWidth)
                wid = window.innerWidth;
            else if (document.body.clientWidth)
                wid = document.body.clientWidth;
            //获取窗口高度
            if (window.innerHeight)
                hei = window.innerHeight;
            else if (document.body.clientHeight)
                hei = document.body.clientHeight;
            //通过深入Document内部对body进行检测，获取窗口大小
            if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
                wid = document.documentElement.clientWidth;
                hei = document.documentElement.clientHeight;
            }
            return {
                width: wid,
                height: hei
            }
        }
    }

    return {
        restrict: 'E',
        replace: true,
        scope: {
            myData: '=',//数据源
            myInterval: "@",//滚动间隔
            name: '=',
            myChange: "&"//每切换一页的回调函数，回调函数接受一个索引值做为参数
        },
        transclude: true,
        controllerAs: "carouselCtrl",
        controller: function () {
            this.sliders = [];
            this.addSlider = function (slider) {
                this.sliders.push(slider);
            }
        },
        template: '<div class="myslider-box">' +
        '<ul class="myslider-ul" ng-transclude></ul>' +
        '<ol class="myslider-dots">' +
        '<li ng-repeat="item in dotData track by $index" ng-click = "mySlider.goIndex($index)" ng-class=\'{true:"active",false:""}[carouselCtrl.sliders[$index].isSelected]\'></li>' +
        '</ol>' +
        '</div>',
        link: function (scope, elem, iAttrs) {
            var myInterval = iAttrs.myInterval;
            scope.$watch('myData', function (newValue, oldValue) {
                console.log(scope.myData);
                try{
                    $timeout.cancel(scope.mySlider.timer);
                    delete scope.mySlider;
                }
                catch(e){}
                scope.mySlider = new mySlider({
                    scope: scope,
                    box: elem.find('ul'),
                    playInterval: myInterval
                })
                scope.mySlider.goIndex(0);
            })
        }
    };
}]);

_myApp.directive('mySlider', ["$parse", function ($parse) {
    return {
        scope: {},
        require: '^?myCarousel',
        restrict: 'E',
        template: '<li class="myslider-li" ng-transclude></li>',
        replace: true,
        transclude: true,
        link: function (scope, elem, iAttrs, controller) {
            scope.isSelected = false;
            var ngRepeat = iAttrs.ngRepeat;

            var repeatMatch = ngRepeat.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/),
                repeatCollections = repeatMatch[2];
            scope.$parent['dataSource'] = repeatCollections;

            controller.addSlider(scope);
            if (controller.sliders.length > 0) {
                angular.forEach(controller.sliders, function (item, index) {
                    if (index == 0) {
                        item.isSelected = true;
                    }
                })
            }
        }
    };
}]);