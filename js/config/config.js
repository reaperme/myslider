var app = angular.module("app", [
    "ui.router",
    '_myApp'
]);
app.config([
    '$stateProvider',
    '$locationProvider',
    "$urlRouterProvider",
    function ($stateProvider, $locationProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/index");
        $stateProvider
            .state('index', {//首页路由
                url: "/index",
                templateUrl: 'views/index.html',
                controller: 'indexCtrl'
            })
            .state('index2', {//首页路由
                url: "/index2",
                templateUrl: 'views/index2.html',
                controller: 'index2Ctrl'
            })
    }])