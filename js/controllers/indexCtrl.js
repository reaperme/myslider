app.controller("indexCtrl", [
    "$rootScope",
    "$scope",
    "$window",
    "$state",
    "$stateParams",
    function ($rootScope, $scope, $window, $state, $stateParams) {
        //$scope.text = "hello world!";
        $scope.text1 = "hello world1!";
        $scope.text2 = "hello world2!";
        $scope.data = [{
            name: "呵呵"
        }, {
            name: "尼玛"
        }]
        $scope.show = function (obj) {
            console.log(obj)
            //alert(obj.name.name)
        }
        //$scope.title = "标题";
        //$scope.contents = [{text: 1234}, {text: 5678}];
        //$scope.showName = function () {
        //    console.log(111)
        //}
    }
])


/**
 * Created by sc09395 on 2014/10/14 0014.
 */
app.directive("myTest", function () {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            text: "@",
            data: "=a",
            myFn: '&'
        },
        template: '<div ng-click="myFn()">hello {{text}}  1 {{data.name}}</div>',
        link: function ($scope, $elem, $attr) {
            //console.log($elem)
            //console.log($attr);
            //console.log($scope.text);
            //$scope.text = "尼玛";
            //console.log($scope.data);
            //$scope.data = {
            //    name: '呵呵呵'
            //}
        }
    }
})


app.directive("direct", function () {
    return {
        restrict: 'ECMA',
        template: '<div>{{ title }}</div>' +
        '<div><ul><li ng-repeat="x in contents">{{ x.text }}</li></ul></div>',
        scope: {
            getTitle: '&',
            getContent: '&',
            show: '&showName'
        },
        controller: function ($scope) {
            $scope.title = $scope.getTitle();    //调用无参函数
            $scope.contents = $scope.getContent();    //调用无参函数
        }
    }
})

app.controller("sliderCtrl", [
    "$rootScope",
    "$scope",
    function ($rootScope, $scope) {
        $scope.text = "hello world!";
        $scope.data = [{
            name: "呵呵"
        }, {
            name: "尼玛"
        }]

        $scope.da = [{
            img: "../../img/1.jpg"
        }, {
            img: "../../img/2.jpg"
        }, {
            img: "../../img/3.jpg"
        }]
    }
]).directive("slider", function () {
    return {
        restrict: "E",
        replace: true,
        transclude: true,
        scope: {
            data: "="
        },
        templateUrl: 'views/slider.html',
        link: function ($scope, $elem, $attr) {
            console.log(111)
        }
    }
})